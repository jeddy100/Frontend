import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeBatimentService, TypeBatimentModel, ApiResponse } from '../../service/typebatiment-service';
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
  loading: boolean = false;
  private cdr: ChangeDetectorRef;

  constructor(
    private fb: FormBuilder,
    private typeBatimentService: TypeBatimentService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.typeForm = this.fb.group({
      designation: ['', Validators.required]
    });

    this.cdr = this.changeDetectorRef;
  }

  ngOnInit() {
    console.log('Component initialized'); 
    this.loadTypesBatiment();
  }

  loadTypesBatiment() {
    this.loading = true;
    this.typesBatiment = [];
    
    this.typeBatimentService.getTypeBatiments().subscribe({
      next: (response: TypeBatimentModel[] | ApiResponse) => {
        console.log('Réponse brute:', response);
        
        // Vérifier si c'est un tableau direct
        if (Array.isArray(response)) {
          this.typesBatiment = response;
        } 
        // Vérifier si c'est un objet avec la structure ApiResponse
        else if (response && typeof response === 'object' && 'data' in response) {
          const apiResponse = response as ApiResponse;
          if (apiResponse.data && Array.isArray(apiResponse.data.content)) {
            this.typesBatiment = apiResponse.data.content;
          } else {
            this.typesBatiment = [];
          }
        } 
        // Autre structure inattendue
        else {
          console.warn('Structure de réponse inattendue:', response);
          this.typesBatiment = [];
        }
        
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement:', err);
        this.typesBatiment = [];
        this.loading = false;
        this.cdr.detectChanges();
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erreur', 
          detail: 'Impossible de charger les types' 
        });
      }
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      console.log('Création du type:', this.typeForm.value);
      
      const type: TypeBatimentModel = this.typeForm.value;
      this.typeBatimentService.createTypeBatiment(type).subscribe({
        next: (result) => {
          console.log('Type créé:', result);
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Type créé avec succès' 
          });
          this.typeForm.reset();
          this.loadTypesBatiment();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Erreur', 
            detail: 'Échec de la création: ' + (err.message || 'Erreur inconnue') 
          });
        }
      });
    }
  }

  scrollToForm(): void {
    console.log('Scrolling to form...');
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}