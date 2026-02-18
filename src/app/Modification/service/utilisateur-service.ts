import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:3000/utilisateur'; //port
  constructor(private http: HttpClient) {}
 getUtilisateurs(): Observable<any> {
 return this.http.get(this.apiUrl);
 }
 addUtilisateur(utilisateur: any): Observable<any> {
  console.log(utilisateur); // Affiche les données de l'utilisateur dans la console
 return this.http.post(this.apiUrl, utilisateur);
 }
 updateUtilisateur(id: string, utilisateur: any): Observable<any> {
 return this.http.put(`${this.apiUrl}/${id}`, utilisateur);
 }
 deleteUtilisateur(id: string): Observable<any> {
 return this.http.delete(`${this.apiUrl}/${id}`);
 }

  
}
