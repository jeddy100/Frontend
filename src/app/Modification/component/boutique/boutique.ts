import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../service/produit-service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Card } from "primeng/card";
import { Dialog } from "primeng/dialog";



@Component({
  selector: 'app-boutique',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, Card, Dialog],
  templateUrl: './boutique.html',
  styleUrl: './boutique.scss',
})
export class Boutique implements OnInit {
   designation: string = '';
  typeProduit: string = '';
  selectedFile!: File;

  constructor(private produitService: ProduitService,private cd: ChangeDetectorRef) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  // Pour ajouter un produit

  addProduit() {
    const formData = new FormData();

    formData.append('designation', this.designation);
    formData.append('typeProduit', this.typeProduit);
    formData.append('image', this.selectedFile);

    this.produitService.addProduit(formData)
      .subscribe({
        next: (res) => {
          console.log('Produit créé :', res);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  // Pour afficher les produits

  produits: any[] = [];
  ngOnInit(): void {
  this.loadProduits();
}

 loadProduits() {
  console.log("Avant API :", this.produits);

  this.produitService.getProduitsAvecPrix2().subscribe({
    next: (res: any) => {
      console.log("Réponse API :", res.data);
      this.produits = res.data;
      this.cd.detectChanges();
      console.log("Après assignation :", this.produits);
    }
  });
}


 deleteProduit(id: string): void {
 this.produitService.deleteProduit(id).subscribe(() =>
this.loadProduits());
 }


 // Pour ajouter le prix de vente d'un produit
 displayModal = false;
produitSelectionne: any = null;
prixAjoute: number = 0;

openModal(produit: any) {
  this.produitSelectionne = produit;
  this.prixAjoute = 0;
  this.displayModal = true;
}

ajouterPrix() {
  if (!this.prixAjoute || !this.produitSelectionne) return;

  this.produitService.addPrix(this.produitSelectionne._id, this.prixAjoute)
    .subscribe({
      next: res => {
        console.log('Prix ajouté:', res);
        this.displayModal = false;
      },
      error: err => console.error(err)
    });
}

// Pour ajouter une entrée de stock
displayEntreeModal = false;
produitSelectionne2: any = null;

quantiteEntree: number = 0;
prixUnitaireEntree: number = 0;

openEntreeModal(produit: any) {
  this.produitSelectionne2 = produit;
  this.quantiteEntree = 0;
  this.prixUnitaireEntree = 0;
  this.displayEntreeModal = true;
}

ajouterEntree() {

  if (!this.quantiteEntree || !this.prixUnitaireEntree) {
    alert("Remplis tous les champs");
    return;
  }

  this.produitService
    .ajouterEntree(
      this.produitSelectionne2._id,
      this.quantiteEntree,
      this.prixUnitaireEntree
    )
    .subscribe({
      next: (res) => {
        console.log("Entrée enregistrée", res);
        this.displayEntreeModal = false;
      },
      error: (err) => console.error(err)
    });
}





}
