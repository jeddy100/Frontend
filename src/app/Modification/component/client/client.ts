import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur-service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../service/client-service';
import { Dialog } from "primeng/dialog";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-client',
  templateUrl: './client.html',
  styleUrls: ['./client.scss'],
  imports: [CommonModule, Dialog, FormsModule, ButtonModule]
})
export class Client implements OnInit {

  utilisateur: any = {};
  achatsRecents: any[] = [];
  loading: boolean = true;

  displayRechargeModal = false;
  montantRecharge: number = 0;

  constructor(
    private auth: UtilisateurService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private transactionService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadUtilisateur();
  }

  loadUtilisateur(): void {
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        this.utilisateur = res;
        this.loading = false;
        this.loadAchatsRecents(); // 🔹 Charger les achats après utilisateur
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur utilisateur :', err);
        this.loading = false;
      }
    });
  }

  loadAchatsRecents(): void {
    if (!this.utilisateur._id) return;

    this.transactionService.getAchatsClientById()
      .subscribe({
        next: (res: any) => {
          console.log('Achats récents :', res);
          this.achatsRecents = res;
          this.cd.detectChanges(); // 🔹 forcer la mise à jour du DOM
        },
        error: (err) => console.error('Erreur récupération achats :', err)
      });
  }

  openRechargeModal() {
    this.montantRecharge = 0;
    this.displayRechargeModal = true;
  }

  rechargerSolde() {
    if (!this.montantRecharge || this.montantRecharge <= 0) {
      alert("Montant invalide");
      return;
    }

    this.transactionService.recharger(this.montantRecharge).subscribe({
      next: (res: any) => {
        this.utilisateur.solde = res.nouveauSolde;
        this.displayRechargeModal = false;
      },
      error: (err) => console.error(err)
    });
  }
}