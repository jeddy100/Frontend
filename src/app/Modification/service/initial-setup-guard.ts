import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CentreService } from './centre-service';

@Injectable({
  providedIn: 'root',
})
export class InitialSetupGuard implements CanActivate {
  constructor(private centreService: CentreService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.centreService.hasAnyCentre().pipe(
      map((hasCentre) => {
        if (hasCentre) {
          // Il existe déjà un centre -> on laisse activer la route (login2)
          return true;
        }
        // Aucun centre -> redirection vers la création de centre
        return this.router.createUrlTree(['/setup-centre']);
      }),
      // En cas d'erreur backend, on laisse activer la route login2
      catchError(() => of(true as boolean))
    );
  }
}

