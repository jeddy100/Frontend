import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../service/utilisateur-service';
import { Button, ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-client',
  imports: [CommonModule, FormsModule, Button, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './inscription-client.html',
  styleUrl: './inscription-client.scss',
})
export class InscriptionClient {
  newutilisateur = { username: '', password: '', type: 'client'};

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}

  addUtilisateur() {
    console.log('Bouton cliqué');
    console.log(this.newutilisateur);

    this.utilisateurService.addUtilisateur(this.newutilisateur).subscribe({
      next: (res) => {
        console.log('Succès', res);
        this.router.navigate(['/login2']);
      },
      error: (err) => console.error('Erreur', err),
    });
  }
}
