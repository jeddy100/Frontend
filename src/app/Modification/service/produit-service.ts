import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:3000/produit';
   private apiUrlPrix = 'http://localhost:3000/PrixVenteProduitParBoutique';

  constructor(private http: HttpClient) {}

  addProduit(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteProduit(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

   addPrix(produitId: string, prixVente: number) {
    return this.http.post(this.apiUrlPrix, { produitId, prixVente });
  }

  // produit.service.ts
getProduitsAvecPrix() {
  return this.http.get<any>('http://localhost:3000/produit/with-prix');
}



  private apiUrlMouvementENtree = 'http://localhost:3000/mouvementProduit/entree';
   ajouterEntree(produitId: string, quantite: number, prixUnitaire: number) {
    return this.http.post(this.apiUrlMouvementENtree, {
      produitId,
      quantite,
      prixUnitaire
    });
  }

  getProduitsAvecPrix2() {
  return this.http.get<any>('http://localhost:3000/produit/with-prix2');

  
}

getProduitsAvecPrixClient() {
  return this.http.get<any>('http://localhost:3000/produit/with-prix-client');
}

  private apiUrlMouvementSortie = 'http://localhost:3000/mouvementProduit/achat';

 acheterProduit(produitId: string, quantite: number,stockActuel: number) {
    return this.http.post(`${this.apiUrlMouvementSortie}`, { produitId, quantite, stockActuel });
  }


  

}
