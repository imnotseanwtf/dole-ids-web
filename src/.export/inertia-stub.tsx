/* eslint-disable @typescript-eslint/no-explicit-any */
// ponytail: minimal @inertiajs/react stand-in for static HTML export only.
import * as React from 'react';

declare global {
    // eslint-disable-next-line no-var
    var __PAGE_URL__: string | undefined;
    // eslint-disable-next-line no-var
    var __PAGE_TITLE__: string | undefined;
}

const noop = () => {};

function toHref(href: any): string {
    if (typeof href === 'string') return href;
    if (href && typeof href === 'object' && 'url' in href) return href.url;
    return String(href ?? '#');
}

export function usePage() {
    return {
        url: globalThis.__PAGE_URL__ ?? '/',
        component: '',
        props: {
            auth: {
                user: {
                    id: 1,
                    name: 'Flavio Deza III',
                    email: 'fdeza@gmail.com',
                    email_verified_at: '2026-01-01T00:00:00Z',
                    two_factor_enabled: false,
                },
            },
            name: 'DOLE IDS',
            errors: {},
            sidebarOpen: true,
        } as any,
    };
}

export const Link = React.forwardRef<HTMLAnchorElement, any>(function Link(
    { href, method, as, data, preserveScroll, preserveState, prefetch, cacheFor, only, replace, onClick, children, ...rest },
    ref,
) {
    return (
        <a ref={ref} href={toHref(href)} {...rest}>
            {children}
        </a>
    );
});

export function Head({ title }: { title?: string; children?: React.ReactNode }) {
    if (title) globalThis.__PAGE_TITLE__ = title;
    return null;
}

export function Form({
    children,
    action,
    method,
    resetOnSuccess,
    resetOnError,
    disableWhileProcessing,
    options,
    transform,
    onSuccess,
    onError,
    onFinish,
    ...rest
}: any) {
    const url = typeof action === 'object' && action ? action.url : action;
    const m = (typeof action === 'object' && action ? action.method : method) ?? 'post';
    const slot = {
        processing: false,
        progress: null,
        errors: {} as Record<string, string>,
        wasSuccessful: false,
        recentlySuccessful: false,
        isDirty: false,
        setError: noop,
        clearErrors: noop,
        resetAndClearErrors: noop,
        submit: noop,
    };
    const body = typeof children === 'function' ? children(slot) : children;
    return (
        <form action={url} method={m === 'get' ? 'get' : 'post'} {...rest}>
            {body}
        </form>
    );
}

export const router: any = new Proxy({}, { get: () => noop });

export function setLayoutProps() {}

export function useHttp() {
    return {
        data: null,
        processing: false,
        errors: {},
        error: null,
        get: noop,
        post: noop,
        put: noop,
        patch: noop,
        delete: noop,
        submit: noop,
        cancel: noop,
        reset: noop,
    } as any;
}

export function createInertiaApp() {}

export type InertiaLinkProps = React.ComponentProps<'a'> & { href: any };
