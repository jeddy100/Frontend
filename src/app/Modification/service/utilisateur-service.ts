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
// Méthodes pour l'authentification

 login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

   getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
        localStorage.removeItem('role');

  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  saveRole(role: string) {
  localStorage.setItem('role', role);
}

getRole() {
  return localStorage.getItem('role');
}
getCurrentUser() {
  return this.http.get<any>('http://localhost:3000/me');
}




  
}
