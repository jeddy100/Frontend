import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CentreModel {
  _id?: string;
  id?: string;
  designation: string;
  heure_ouverture?: string;
  heure_fermeture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CentreService {

  private apiUrl = 'http://localhost:3000/centreCommercial'; // Adapter selon l'API

  constructor(private http: HttpClient) {}

  createCentre(centre: CentreModel): Observable<CentreModel> {
    return this.http.post<CentreModel>(this.apiUrl, centre);
  }

  getCentres(): Observable<CentreModel[] | CentreModel | null> {
    return this.http.get<CentreModel[] | CentreModel | null>(this.apiUrl);
  }

  hasAnyCentre(): Observable<boolean> {
    return this.getCentres().pipe(
      map((result) => {
        if (!result) {
          return false;
        }
        if (Array.isArray(result)) {
          return result.length > 0;
        }
        return true;
      })
    );
  }

}
