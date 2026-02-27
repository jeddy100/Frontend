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
  if (!this.centreForm.valid) {
    return;
  }

  const centre: CentreModel = this.centreForm.value;

  // 1️⃣ Enregistrement en base
  this.centreService.createCentre(centre).subscribe({

    next: (response: any) => {

      // 2️⃣ Ici le centre est déjà enregistré en base
      console.log("Centre enregistré en base :", response);
            console.log("Centre id enregistré en base :", response.data._id);

        
      

      // 3️⃣ On récupère l'id renvoyé par le backend
      const centreId = response.data._id;

      if (!centreId) {
        console.error("Le backend ne retourne pas l'id !");
        return;
      }

      console.log("ID récupéré :", centreId);

      // 4️⃣ Maintenant on peut l'utiliser
      localStorage.setItem('currentCentreId', centreId);

      this.router.navigate(['/inscription']);
    },

    error: (err) => {
      console.error("Erreur création centre :", err);
    }
  });
}
}
