// ponytail: one-shot static HTML exporter — SSR-renders each Inertia page with
// its real layout and writes plain HTML into ../html/{group}/{page}.html.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const SRC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(SRC, '..', 'html');
const PAGES_DIR = path.join(SRC, 'resources/js/pages');

// page file (relative, no ext) -> app URL
function urlFor(rel) {
    const [dir, name] = rel.includes('/') ? rel.split('/') : [null, rel];
    if (rel === 'welcome') return '/';
    if (rel === 'dashboard') return '/dashboard';
    if (dir === 'auth') return `/${name}`;
    if (name === 'dashboard' || name === 'home') return `/${dir}`;
    return `/${dir}/${name}`;
}

function groupFor(rel) {
    return rel.includes('/') ? rel.split('/')[0] : 'general';
}

const pageFiles = [];
for (const entry of fs.readdirSync(PAGES_DIR, { recursive: true })) {
    if (entry.endsWith('.tsx')) pageFiles.push(entry.replace(/\.tsx$/, ''));
}

// URL -> output html path (repo-relative under html/)
const routeToFile = {};
for (const rel of pageFiles) {
    const [group, name] = rel.includes('/') ? rel.split('/') : ['general', rel];
    routeToFile[urlFor(rel)] = `${group}/${name}.html`;
}

routeToFile['/logout'] = 'auth/login.html';

const perPageProps = {
    'auth/login': { canResetPassword: true },
    'auth/verify-email': { status: '' },
    'auth/reset-password': { email: 'user@example.com', token: 'token' },
    'settings/profile': { mustVerifyEmail: false, status: '' },
};

const server = await createServer({
    root: SRC,
    configFile: false,
    logLevel: 'error',
    server: { middlewareMode: true, hmr: false },
    resolve: {
        alias: {
            '@inertiajs/react': path.join(SRC, '.export/inertia-stub.tsx'),
            '@': path.join(SRC, 'resources/js'),
        },
    },
    ssr: { noExternal: ['@inertiajs/react'] },
});

const load = (id) => server.ssrLoadModule(id);

const [adminL, centralL, provincialL, authL, appL, settingsL, tooltip] = await Promise.all([
    load('@/layouts/admin/layout'),
    load('@/layouts/central/layout'),
    load('@/layouts/provincial/layout'),
    load('@/layouts/auth-layout'),
    load('@/layouts/app-layout'),
    load('@/layouts/settings/layout'),
    load('@/components/ui/tooltip'),
]);

function layoutsFor(rel) {
    if (rel === 'welcome') return [];
    if (rel.startsWith('auth/')) return [authL.default];
    if (rel.startsWith('admin/')) return [adminL.default];
    if (rel.startsWith('central/')) return [centralL.default];
    if (rel.startsWith('provincial/')) return [provincialL.default];
    if (rel.startsWith('settings/')) return [appL.default, settingsL.default];
    return [appL.default];
}

async function renderPage(rel) {
    globalThis.__PAGE_URL__ = urlFor(rel);
    globalThis.__PAGE_TITLE__ = undefined;
    const mod = await load(`@/pages/${rel}`);
    const Page = mod.default;
    let node = React.createElement(Page, perPageProps[rel] ?? {});
    const layoutProps = typeof Page.layout === 'object' && Page.layout ? Page.layout : {};
    for (const Layout of [...layoutsFor(rel)].reverse()) {
        node = React.createElement(Layout, Layout === layoutsFor(rel)[0] ? layoutProps : {}, node);
    }
    node = React.createElement(tooltip.TooltipProvider, { delayDuration: 0 }, node);
    return { html: renderToStaticMarkup(node), title: globalThis.__PAGE_TITLE__ };
}

// --- provincial header panels: re-render home with flipped useState to harvest open panels ---
const layoutFile = path.join(SRC, 'resources/js/layouts/provincial/layout.tsx');
const layoutSource = fs.readFileSync(layoutFile, 'utf8');

function extractBalancedDiv(html, marker) {
    const m = html.indexOf(marker);
    if (m === -1) return null;
    const start = html.lastIndexOf('<div', m);
    let depth = 0;
    const re = /<div\b|<\/div>/g;
    re.lastIndex = start;
    for (let match; (match = re.exec(html)); ) {
        depth += match[0] === '</div>' ? -1 : 1;
        if (depth === 0) return html.slice(start, re.lastIndex);
    }
    return null;
}

async function harvestPanels() {
    fs.writeFileSync(
        layoutFile,
        layoutSource
            .replace('const [showNotifs, setShowNotifs] = useState(false);', 'const [showNotifs, setShowNotifs] = useState(true);')
            .replace('const [showProfile, setShowProfile] = useState(false);', 'const [showProfile, setShowProfile] = useState(true);'),
    );
    try {
        server.moduleGraph.invalidateAll();
        globalThis.__PAGE_URL__ = '/provincial';
        const [freshLayout, homePage] = await Promise.all([load('@/layouts/provincial/layout'), load('@/pages/provincial/home')]);
        const html = renderToStaticMarkup(
            React.createElement(freshLayout.default, {}, React.createElement(homePage.default)),
        );
        let notif = extractBalancedDiv(html, 'w-[370px]');
        let profile = extractBalancedDiv(html, 'w-44 overflow-hidden');
        notif = notif
            .replace('class="', 'id="notif-panel" class="js-panel hidden ')
            .replace('aria-label="Close"', 'aria-label="Close" data-toggle="notif-panel"');
        profile = profile.replace('class="', 'id="profile-panel" class="js-panel hidden ');
        return { notif, profile };
    } finally {
        fs.writeFileSync(layoutFile, layoutSource);
        server.moduleGraph.invalidateAll();
    }
}

function injectPanels(html, panels) {
    return html
        .replace('<button aria-label="Notifications">', '<button aria-label="Notifications" data-toggle="notif-panel">')
        .replace(/(<button aria-label="Notifications"[^>]*>[\s\S]*?<\/button>)/, `$1${panels.notif}`)
        .replace('<button aria-label="Profile">', '<button aria-label="Profile" data-toggle="profile-panel">')
        .replace(/(<button aria-label="Profile"[^>]*>[\s\S]*?<\/button>)/, `$1${panels.profile}`);
}

const unmatched = new Set();

function rewriteLinks(html, groupDir) {
    return html.replace(/href="([^"]*)"/g, (full, href) => {
        if (routeToFile[href]) {
            let rel = path.relative(groupDir, routeToFile[href]);
            if (!rel.startsWith('.')) rel = `./${rel}`;
            return `href="${rel}"`;
        }
        if (href.startsWith('/')) unmatched.add(href);
        return full;
    });
}

function shell({ title, body, depth }) {
    const assets = `${'../'.repeat(depth)}assets`;
    return `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="stylesheet" href="${assets}/fonts.css" />
    <link rel="stylesheet" href="${assets}/app.css" />
    <script defer src="${assets}/app.js"></script>
</head>
<body>
${body}
</body>
</html>
`;
}

const panels = await harvestPanels();
let ok = 0;
const failed = [];

for (const rel of pageFiles) {
    const group = groupFor(rel);
    const name = rel.includes('/') ? rel.split('/')[1] : rel;
    try {
        let { html, title } = await renderPage(rel);
        if (group === 'provincial') html = injectPanels(html, panels);
        html = rewriteLinks(html, group);
        const pretty = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        title = title ? `${title} - DOLE IDS` : `${group[0].toUpperCase()}${group.slice(1)} ${pretty} - DOLE IDS`;
        const outFile = path.join(OUT, group, `${name}.html`);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, shell({ title, body: html, depth: 1 }));
        ok++;
    } catch (e) {
        failed.push([rel, e.message]);
    }
}

console.log(`rendered ${ok}/${pageFiles.length}`);
for (const [rel, msg] of failed) console.log(`FAILED ${rel}: ${msg}`);
if (unmatched.size) console.log('unmatched hrefs:', [...unmatched].sort().join(' '));

await server.close();
