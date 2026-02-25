import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TypeBatimentModel {
  _id?: string;
  designation: string;
}

export interface BatimentModel {
  _id?: string;
  id?: string;
  designation: string;
  centrecommercial: string; // ID du centre
  typebatiment: string; // ID du type
  nbrEtage: number;
  surfaceEtage: number;
}

@Injectable({
  providedIn: 'root',
})
export class BatimentService {

  private apiUrl = 'http://localhost:3000/batiments'; // Adapter selon l'API

  constructor(private http: HttpClient) {}

  createBatiment(batiment: BatimentModel): Observable<BatimentModel> {
    return this.http.post<BatimentModel>(this.apiUrl, batiment);
  }

  getBatimentsByCentre(centreId: string): Observable<BatimentModel[]> {
    return this.http.get<BatimentModel[]>(`${this.apiUrl}?centrecommercial=${centreId}`);
  }
}