import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TypeBatimentModel {
  _id?: string;
  id?: string;
  designation: string;
}

export interface ApiResponse {
  status: number;
  message: string;
  data: {
    content: TypeBatimentModel[];
    totalElements?: number;
    totalPages?: number;
    pageNumber?: number;
    pageSize?: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TypeBatimentService {

  private apiUrl = 'http://localhost:3000/typeBatiment'; // Adapter selon l'API

  constructor(private http: HttpClient) {}

  createTypeBatiment(type: TypeBatimentModel): Observable<TypeBatimentModel> {
    return this.http.post<TypeBatimentModel>(this.apiUrl, type);
  }

  getTypeBatiments(): Observable<TypeBatimentModel[]> {
    return this.http.get<TypeBatimentModel[]>(this.apiUrl);
  }
}