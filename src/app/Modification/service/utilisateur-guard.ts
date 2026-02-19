import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilisateurService } from './utilisateur-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: UtilisateurService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login2']);
    return false;
  }
}
