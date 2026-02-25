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
        const currentCentreId = localStorage.getItem('currentCentreId');

        if (role === 'admin') {
            this.model = [
                {
                    label: 'Gestion Centre commercial',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
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
                        // N'afficher le menu Bâtiments que si un centre est connu
                        ...(currentCentreId
                            ? [
                                  {
                                      label: 'Bâtiments',
                                      icon: 'pi pi-briefcase',
                                      routerLink: ['/batiment', currentCentreId],
                                  } as MenuItem,
                              ]
                            : []),
                    ],
                },
            ];
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
                    ],
                },
            ];
        } else {
            this.model = [];
        }
    }
}
