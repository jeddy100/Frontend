import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../service/utilisateur-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
  imports: [CommonModule],
})
export class Admin implements OnInit {
  utilisateur: any;
  loading: boolean = false;
  error: string = '';
  currentCentreId: string | null = null;

  constructor(private auth: UtilisateurService, private router: Router,  private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.currentCentreId = localStorage.getItem('currentCentreId');
    this.loadUtilisateur();
  }

  loadUtilisateur(): void {
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        console.log('REPONSE BACKEND :', res);
        this.utilisateur = res;
                this.cd.detectChanges();
        this.loading = false;
      },
      error: (err) => {
        console.log('ERREUR :', err);
        this.loading = false;
      },
    });
  }
}
