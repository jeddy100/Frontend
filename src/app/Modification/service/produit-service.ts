import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'https://meanproject-2.onrender.com/produit';
   private apiUrlPrix = 'https://meanproject-2.onrender.com/PrixVenteProduitParBoutique';

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
  return this.http.get<any>('https://meanproject-2.onrender.com/produit/with-prix');
}



  private apiUrlMouvementENtree = 'https://meanproject-2.onrender.com/mouvementProduit/entree';
   ajouterEntree(produitId: string, quantite: number, prixUnitaire: number) {
    return this.http.post(this.apiUrlMouvementENtree, {
      produitId,
      quantite,
      prixUnitaire
    });
  }

  getProduitsAvecPrix2() {
  return this.http.get<any>('https://meanproject-2.onrender.com/produit/with-prix2');

  
}

getProduitsAvecPrixClient() {
  return this.http.get<any>('https://meanproject-2.onrender.com/produit/with-prix-client');
}

  private apiUrlMouvementSortie = 'https://meanproject-2.onrender.com/mouvementProduit/achat';

 acheterProduit(produitId: string, quantite: number,stockActuel: number) {
    return this.http.post(`${this.apiUrlMouvementSortie}`, { produitId, quantite, stockActuel });
  }


  

}
