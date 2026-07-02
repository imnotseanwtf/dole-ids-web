// ponytail: one-shot Tailwind build for the static html/ export.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

const dir = path.dirname(fileURLToPath(import.meta.url));

export default {
    root: dir,
    base: './',
    plugins: [tailwindcss()],
    build: {
        outDir: path.resolve(dir, '../../html/assets'),
        emptyOutDir: false,
        rollupOptions: {
            input: path.join(dir, 'entry.css'),
            output: { assetFileNames: 'app[extname]' },
        },
    },
};
