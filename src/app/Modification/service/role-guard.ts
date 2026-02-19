import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UtilisateurService } from './utilisateur-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: UtilisateurService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role'];
    const userRole = this.auth.getRole();

    if (userRole === expectedRole) {
      return true;
    }

    this.router.navigate(['/login2']);
    return false;
  }
}
