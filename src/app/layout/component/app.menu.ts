import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { UtilisateurService } from '../../Modification/service/utilisateur-service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `,
})
export class AppMenu {
    model: MenuItem[] = [];

    constructor(private utilisateurService: UtilisateurService) {}

    ngOnInit() {
        const role = this.utilisateurService.getRole();

        if (role === 'admin') {
            this.utilisateurService.getCurrentUser().subscribe({
                next: (user) => {
                    const centreId = user?.idCentre || localStorage.getItem('currentCentreId') || '';
                    if (centreId) {
                        localStorage.setItem('currentCentreId', centreId);
                    }
                    this.buildAdminMenu(
                        centreId ? ['/batiment', centreId] : ['/centreCommercial']
                    );
                },
                error: () => {
                    const centreId = localStorage.getItem('currentCentreId') || '';
                    this.buildAdminMenu(
                        centreId ? ['/batiment', centreId] : ['/centreCommercial']
                    );
                },
            });
        } else if (role === 'boutique') {
            this.model = [
                {
                    label: 'Espace Boutique',
                    items: [
                        {
                            label: 'Accueil Boutique',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/boutique'],
                        },
                        
                    ],
                },
            ];
        } else if (role === 'client') {
            this.model = [
                {
                    label: 'Espace Client',
                    items: [
                        {
                            label: 'Accueil Client',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/client'],
                        },
                         {
                            label: 'Achats',
                            icon: 'pi pi-fw pi-shopping-cart',
                            routerLink: ['/client-produit'],
                        },
                    ],
                },
            ];
        } else {
            this.model = [];
        }
    }

    private buildAdminMenu(batimentLink: any[]): void {
        this.model = [
            {
                label: 'Espace admin',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                ],
            },
            {
                label: 'Structure du centre',
                items: [
                    {
                        label: 'Centres',
                        icon: 'pi pi-building',
                        routerLink: ['/centreCommercial'],
                    },
                    {
                        label: 'Types de Bâtiment',
                        icon: 'pi pi-tags',
                        routerLink: ['/typebatiment'],
                    },
                    {
                        label: 'Bâtiments',
                        icon: 'pi pi-briefcase',
                        routerLink: batimentLink,
                    },
                ],
            },
            {
                label: 'Gestion utilisateurs',
                items: [
                    {
                        label: 'Utilisateurs',
                        icon: 'pi pi-users',
                        routerLink: ['/utilisateurs'],
                    },
                ],
            },
        ];
    }
}
