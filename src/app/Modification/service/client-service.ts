import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
   private apiUrl = 'https://meanproject-2.onrender.com/transactionSolde';

  constructor(private http: HttpClient) {}

   recharger(montant: number) {
    return this.http.post(`${this.apiUrl}/recharger`, { montant });
  }


  // client-service.ts
private apiUrlMouvementSortie = 'https://meanproject-2.onrender.com/mouvementProduit/achat';

getAchatsClientById(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlMouvementSortie}`);
}
  
}
