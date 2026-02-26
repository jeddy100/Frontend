import { ChangeDetectorRef, Component } from '@angular/core';
import { ProduitService } from '../../service/produit-service';
import { DataView, DataViewModule } from "primeng/dataview";
import { SelectButton, SelectButtonModule } from "primeng/selectbutton";
import { Tag, TagModule } from "primeng/tag";
import { Button, ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilisateurService } from '../../service/utilisateur-service';
import { Dialog } from "primeng/dialog";

@Component({
  selector: 'app-client-produit',
  imports: [CommonModule,
    FormsModule,
    DataViewModule,
    SelectButtonModule,
    ButtonModule,
    TagModule, Tag, Dialog],
  templateUrl: './client-produit.html',
  styleUrl: './client-produit.scss',
})
export class ClientProduit {
  produits: any[] = [];
  utilisateur: any = null;
  loading: boolean = true;
  layout: 'list' | 'grid' = 'grid';
  options = ['list', 'grid'];

  constructor(private produitService: ProduitService,  private cd: ChangeDetectorRef,private auth: UtilisateurService
) {}


   ngOnInit(): void {
    this.loadProduits();
     console.log("JE SUIS DANS PRODUIT COMPONENT");
    this.loadUtilisateur();

  }

   loadProduits() {
    this.produitService.getProduitsAvecPrixClient().subscribe({
      next: (res: any) => {
        console.log("REPONSE BACKEND :", res);
        this.produits = res.data;
        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

 getSeverity(produit: any):
  'success' | 'warn' | 'danger' {

  if (produit.stockActuel <= 0) return 'danger';
  if (produit.stockActuel < 5) return 'warn';
  return 'success';
}



  acheter(produit: any) {
    console.log("Acheter produit :", produit);
    // ici on fera plus tard la logique achat
  }


 //// //achat du produit et verification solde 



  displayAchatModal: boolean = false;

produitSelectionne: any = null;
quantite: number = 1;
soldeInsuffisant: boolean = false;
  stockInsuffisant: boolean = false;


 loadUtilisateur(): void { 
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        console.log("REPONSE BACKEND :", res);
        this.utilisateur = res; 
        this.loading = false;
      },
      error: (err) => {
        console.log("ERREUR :", err);
        this.loading = false;
      }
    });
  }

  // ---------------- Modal Achat ----------------
  openAchatModal(produit: any) {
    this.produitSelectionne = produit;
        this.stockInsuffisant = false;
    this.quantite = 1;
    this.soldeInsuffisant = false;
    this.displayAchatModal = true;
    this.cd.detectChanges();
  }


  checkAchat() {
    if (!this.produitSelectionne || !this.utilisateur) return;

    const totalPrix = this.produitSelectionne.dernierPrix * this.quantite;

    this.soldeInsuffisant = this.utilisateur.solde < totalPrix;
    this.stockInsuffisant = this.quantite > this.produitSelectionne.stockActuel;
  }

  onQuantiteChange() {
    this.checkAchat();
  }

  acheterProduit() {
    this.checkAchat();
    if (this.soldeInsuffisant || this.stockInsuffisant) return;

    console.log(`Acheter ${this.quantite} x ${this.produitSelectionne.designation}`);
    // Ici tu pourras appeler ton API pour créer la transaction
  }


  validerAchat() {
    const totalPrix = this.produitSelectionne.dernierPrix * this.quantite;

    if (this.quantite > this.produitSelectionne.stockActuel) {
      console.error('Quantité supérieure au stock disponible');
      return;
    }
    if (totalPrix > this.utilisateur.solde) {
      console.error('Solde insuffisant');
      return;
    }

    this.produitService.acheterProduit(this.produitSelectionne._id, this.quantite,this.produitSelectionne.stockActuel).subscribe({
      next: (res: any) => {
        console.log('Achat effectué :', res);
        this.utilisateur.solde = res.soldeRestant;
        this.produitSelectionne.stockActuel -= this.quantite;
        // this.displayAchatModal = false;
      },
      error: (err) => console.error('Erreur achat :', err)
    });
  }


  



}
