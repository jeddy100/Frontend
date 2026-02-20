import { Component } from '@angular/core';
import { UtilisateurService } from '../../service/utilisateur-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from "primeng/button";
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login2',
  imports: [CommonModule, FormsModule, Button,PasswordModule,ButtonModule,InputTextModule],
  templateUrl: './login2.html',
  styleUrl: './login2.scss',
})

export class Login2 {
   user = {
    username: '',
    password: ''
  };

    constructor(private auth: UtilisateurService, private router: Router) {}

// Méthode de connexion
    login() {
  this.auth.login(this.user).subscribe({
    next: (res) => {
      this.auth.saveToken(res.token);
      this.auth.saveRole(res.role);

      if (res.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (res.role === 'client') {
        this.router.navigate(['/client']);
      } else {
        this.router.navigate(['/boutique']);
      }
    },
    error: () => alert('Erreur login')
  });

}



}
