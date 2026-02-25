import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentreService, CentreModel } from '../../service/centre-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-centre',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './centre.html',
  styleUrl: './centre.scss',
  providers: [MessageService]
})
export class Centre implements OnInit {
  centreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private centreService: CentreService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.centreForm = this.fb.group({
      designation: ['', Validators.required],
      heure_ouverture: [''],
      heure_fermeture: ['']
    });
  }

  ngOnInit() {
    // Pas besoin de charger typesBatiment pour l'instant
  }

  onSubmit() {
    if (this.centreForm.valid) {
      const centre: CentreModel = this.centreForm.value;
      this.centreService.createCentre(centre).subscribe({
        next: (createdCentre) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Centre créé avec succès' });
          this.centreForm.reset();
          localStorage.setItem('hasCentre', 'true');
          if (createdCentre._id) {
            localStorage.setItem('currentCentreId', createdCentre._id);
          } else if (createdCentre.id) {
            localStorage.setItem('currentCentreId', createdCentre.id);
          }
          // Après la création du centre, rediriger vers la création de l'utilisateur admin
          this.router.navigate(['/inscription']);
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création du centre' })
      });
    }
  }
}
