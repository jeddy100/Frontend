import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface TypeBatimentModel {
  _id?: string;
  designation: string;
}

export interface BatimentModel {
  _id?: string;
  designation: string;
  typebatiment: string | TypeBatimentModel;
  nbrEtage: number;
  surfaceEtage: number;
  centrecommercial: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BatimentService {

  private apiUrl = 'http://localhost:3000/batiment'; // Adapter selon l'API

  constructor(private http: HttpClient) {}

  createBatiment(batiment: BatimentModel): Observable<BatimentModel> {
    return this.http.post<BatimentModel>(this.apiUrl, batiment);
  }

  getBatimentsByCentre(centreId: string): Observable<BatimentModel[]> {
    // Utilisation du query parameter
    return this.http.get<any>(`${this.apiUrl}?centrecommercial=${centreId}`).pipe(
      map(response => {
        console.log('Réponse brute:', response);
        
        if (response.data && response.data.content) {
          return response.data.content;
        } else if (response.data) {
          return response.data;
        } else if (Array.isArray(response)) {
          return response;
        }
        return [];
      })
    );
  }

  getBatimentsByCentrePaginated(centreId: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?centrecommercial=${centreId}&page=${page}&size=${size}`);
  }

  deleteBatiment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}