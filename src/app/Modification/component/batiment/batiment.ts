import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatimentService, BatimentModel, TypeBatimentModel } from '../../service/batiment-service';
import { TypeBatimentService } from '../../service/typebatiment-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-batiment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    ToastModule
  ],
  templateUrl: './batiment.html',
  styleUrl: './batiment.scss',
  providers: [MessageService]
})
export class Batiment implements OnInit {
  batimentForm: FormGroup;
  typesBatiment: TypeBatimentModel[] = [];
  centreId: string = '';

  constructor(
    private fb: FormBuilder,
    private batimentService: BatimentService,
    private typeBatimentService: TypeBatimentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.batimentForm = this.fb.group({
      designation: ['', Validators.required],
      typebatiment: [null, Validators.required],
      nbrEtage: [1, [Validators.required, Validators.min(1)]],
      surfaceEtage: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.centreId = this.route.snapshot.paramMap.get('centreId') || '';
    this.loadTypesBatiment();
  }

  loadTypesBatiment() {
    this.typeBatimentService.getTypeBatiments().subscribe({
      next: (types) => this.typesBatiment = types,
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les types de bâtiment' })
    });
  }

  onSubmit() {
    if (this.batimentForm.valid && this.centreId) {
      const batiment: BatimentModel = {
        ...this.batimentForm.value,
        centrecommercial: this.centreId
      };
      this.batimentService.createBatiment(batiment).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Bâtiment créé avec succès' });
          this.batimentForm.reset();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création du bâtiment' })
      });
    }
  }

  goBack() {
    this.router.navigate(['/centreCommercial']);
  }
}