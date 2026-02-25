import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
   private apiUrl = 'http://localhost:3000/transactionSolde';

  constructor(private http: HttpClient) {}

   recharger(montant: number) {
    return this.http.post(`${this.apiUrl}/recharger`, { montant });
  }
  
}
