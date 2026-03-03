import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
   private apiUrl = 'http://localhost:3000/transactionSolde';

  constructor(private http: HttpClient) {}

   recharger(montant: number) {
    return this.http.post(`${this.apiUrl}/recharger`, { montant });
  }


  // client-service.ts
private apiUrlMouvementSortie = 'http://localhost:3000/mouvementProduit/achat';

getAchatsClientById(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlMouvementSortie}`);
}
  
}
