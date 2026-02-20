import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../service/produit-service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Card } from "primeng/card";



@Component({
  selector: 'app-boutique',
  imports: [FormsModule, CommonModule, InputTextModule, ButtonModule, Card],
  templateUrl: './boutique.html',
  styleUrl: './boutique.scss',
})
export class Boutique {
   designation: string = '';
  type: string = '';
  selectedFile!: File;

  constructor(private produitService: ProduitService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  addProduit() {
    const formData = new FormData();

    formData.append('designation', this.designation);
    formData.append('type', this.type);
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

}
