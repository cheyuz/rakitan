import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const corePages = import.meta.glob('./Pages/**/*.jsx');
        const pluginPages = import.meta.glob('/plugins/**/pages/**/*.jsx');

        if (corePages[`./Pages/${name}.jsx`]) {
            return resolvePageComponent(`./Pages/${name}.jsx`, corePages);
        }

        for (const path in pluginPages) {
            if (path.endsWith(`/${name}.jsx`)) {
                return resolvePageComponent(path, pluginPages);
            }
        }

        return resolvePageComponent(`./Pages/${name}.jsx`, corePages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
