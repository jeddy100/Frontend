import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../service/utilisateur-service';
import { Button, ButtonModule } from "primeng/button";
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-inscription',
  imports: [CommonModule, FormsModule, Button,PasswordModule,ButtonModule,InputTextModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss',
})
export class Inscription {
  newutilisateur = { username: '', password: '' }; // Nouveau modèle pour le formulaire

  constructor(private utilisateurService: UtilisateurService) {}
  
  addUtilisateur() {
     console.log("Bouton cliqué");
  console.log(this.newutilisateur);

  this.utilisateurService.addUtilisateur(this.newutilisateur)
    .subscribe({
      next: (res) => console.log('Succès', res),
      error: (err) => console.error('Erreur', err)
    });
}

 

}
