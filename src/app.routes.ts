import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Inscription } from './app/Modification/component/inscription/inscription';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            //t'ajoute ici comme ca tu peux faire le lien entre le menu et la route ensuite t ajoute le lien dans le menu dans layout/component/app.menu.ts
             
            {   path: 'centres',
                loadChildren: () =>
                    import('./app/Modification/features/centres/centres.module')
                        .then(m => m.CentresModule)
            },
             {   path: 'utilisateurs',
                loadChildren: () =>
                    import('./app/Modification/features/utilisateur/utilisateur-module')
                        .then(m => m.UtilisateurModule)
            }

        ]
    },
    { path: 'landing', component: Landing },
    { path: 'inscription', component: Inscription },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
