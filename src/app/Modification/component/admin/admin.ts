import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
    imports: [CommonModule], // Assurez-vous d'importer CommonModule pour les directives Angular de base

})
export class Admin implements OnInit {

  utilisateur : any;
  loading: boolean = true;
  error: string = '';

  constructor(private auth: UtilisateurService, private router: Router) {}



ngOnInit(): void {
  this.loadUtilisateur();
}

loadUtilisateur(): void { 
 this.auth.getCurrentUser().subscribe({
    next: (res) => {
      console.log("REPONSE BACKEND :", res); // 👈 IMPORTANT
      this.utilisateur = res; 
      this.loading = false;
    },
    error: (err) => {
      console.log("ERREUR :", err);
      this.loading = false;
    }
  });

 }


}
