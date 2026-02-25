import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur-service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../service/client-service';
import { Dialog } from "primeng/dialog";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-client',
  imports: [CommonModule, Dialog,FormsModule,ButtonModule], // Assurez-vous d'importer CommonModule pour les directives Angular de base
  templateUrl: './client.html',
  styleUrl: './client.scss',
})
export class Client implements OnInit {

utilisateur : any;
  loading: boolean = true;
  error: string = '';

  constructor(private auth: UtilisateurService, private router: Router, private transactionService: ClientService) {}


  ngOnInit(): void {
  this.loadUtilisateur();
}

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
 

displayRechargeModal = false;
montantRecharge: number = 0;

openRechargeModal() {
  this.montantRecharge = 0;
  this.displayRechargeModal = true;
}
rechargerSolde() {

  if (!this.montantRecharge || this.montantRecharge <= 0) {
    alert("Montant invalide");
    return;
  }

  this.transactionService.recharger(this.montantRecharge)
    .subscribe({
      next: (res: any) => {
        this.utilisateur.solde = res.nouveauSolde;
        this.displayRechargeModal = false;
      },
      error: (err) => console.error(err)
    });
}



}







