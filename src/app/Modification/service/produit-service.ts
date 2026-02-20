import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:3000/produit';

  constructor(private http: HttpClient) {}

  addProduit(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
