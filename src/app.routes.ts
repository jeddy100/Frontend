import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Inscription } from './app/Modification/component/inscription/inscription';
import { Login2 } from './app/Modification/component/login2/login2';
import { Admin } from './app/Modification/component/admin/admin';
import { RoleGuard } from './app/Modification/service/role-guard';
import { Client } from './app/Modification/component/client/client';
import { Boutique } from './app/Modification/component/boutique/boutique';
import { ClientProduit } from './app/Modification/component/client-produit/client-produit';
import { Centre } from './app/Modification/component/centre/centre';
import { InitialSetupGuard } from './app/Modification/service/initial-setup-guard';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login2', pathMatch: 'full' },
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            //t'ajoute ici comme ca tu peux faire le lien entre le menu et la route ensuite t ajoute le lien dans le menu dans layout/component/app.menu.ts
             
            {   path: 'centreCommercial',
                loadChildren: () =>
                    import('./app/Modification/features/centres/centres.module')
                        .then(m => m.CentresModule)
            },
            { path: 'batiment/:centreId', loadChildren: () =>
                import('./app/Modification/component/batiment/batiment.module')
                    .then(m => m.BatimentModule)
            },
            { path: 'typebatiment', loadChildren: () =>
                import('./app/Modification/component/typebatiment/typebatiment.module')
                    .then(m => m.TypebatimentModule)
            },
             {   path: 'utilisateurs',
                loadChildren: () =>
                    import('./app/Modification/features/utilisateur/utilisateur-module')
                        .then(m => m.UtilisateurModule)
            },
            {
  path: 'admin',
  component: Admin,
  canActivate: [RoleGuard],
  data: { role: 'admin' }
},
{
  path: 'client',
  component: Client,
  canActivate: [RoleGuard],
  data: { role: 'client' }
},
{
  path: 'client-produit',
  component: ClientProduit,
  canActivate: [RoleGuard],
  data: { role: 'client' }
},
{
  path: 'boutique',
  component: Boutique,
  canActivate: [RoleGuard],
  data: { role: 'boutique' }
}


        ]
    },
    { path: 'landing', component: Landing },
    { path: 'inscription', component: Inscription },
    {
        path: 'login2',
        component: Login2,
        canActivate: [InitialSetupGuard]
    },
    {
        path: 'setup-centre',
        component: Centre
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
