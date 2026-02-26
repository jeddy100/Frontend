import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeBatimentService, TypeBatimentModel } from '../../service/typebatiment-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-typebatiment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TableModule
  ],
  templateUrl: './typebatiment.html',
  styleUrl: './typebatiment.scss',
  providers: [MessageService]
})
export class Typebatiment implements OnInit {
  typeForm: FormGroup;
  typesBatiment: TypeBatimentModel[] = [];

  constructor(
    private fb: FormBuilder,
    private typeBatimentService: TypeBatimentService,
    private messageService: MessageService
  ) {
    this.typeForm = this.fb.group({
      designation: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTypesBatiment();
  }

  loadTypesBatiment() {
    this.typeBatimentService.getTypeBatiments().subscribe({
      next: (types) => this.typesBatiment = types,
      error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les types' })
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      const type: TypeBatimentModel = this.typeForm.value;
      this.typeBatimentService.createTypeBatiment(type).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Type créé avec succès' });
          this.typeForm.reset();
          this.loadTypesBatiment();
        },
        error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la création' })
      });
    }
  }
}