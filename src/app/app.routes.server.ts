import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'Checkout/:id',
        renderMode: RenderMode.Server,
    },
    {
        path: 'details/:id',
        renderMode: RenderMode.Server,
    },
    {
        path: '**',
        renderMode: RenderMode.Prerender,
    }
];
