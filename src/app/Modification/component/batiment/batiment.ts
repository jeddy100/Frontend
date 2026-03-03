import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatimentService, BatimentModel, TypeBatimentModel } from '../../service/batiment-service';
import { TypeBatimentService } from '../../service/typebatiment-service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
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
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule
  ],
  templateUrl: './batiment.html',
  styleUrl: './batiment.scss',
  providers: [MessageService, ConfirmationService]
})
export class Batiment implements OnInit {
  @ViewChild('cd') confirmDialog: any;
  
  batimentForm: FormGroup;
  typesBatiment: TypeBatimentModel[] = []; 
  batiments: BatimentModel[] = [];
  centreId: string = '';
  loading: boolean = false;
  loadingList: boolean = false;

  constructor(
    private fb: FormBuilder,
    private batimentService: BatimentService,
    private typeBatimentService: TypeBatimentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
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
    console.log('Centre ID:', this.centreId);
    this.loadTypesBatiment();
    this.loadBatiments();
  }

  loadTypesBatiment() {
    console.log('Chargement des types de bâtiment...');
    
    // IMPORTANT: Réinitialiser avec un tableau vide avant l'appel
    this.typesBatiment = [];
    
    this.typeBatimentService.getTypeBatiments().subscribe({
      next: (response: any) => {
        console.log('Réponse brute des types:', response);
        
        // Vérifier et normaliser la réponse pour s'assurer que c'est un tableau
        if (Array.isArray(response)) {
          this.typesBatiment = response;
        } else if (response && response.data && Array.isArray(response.data.content)) {
          this.typesBatiment = response.data.content;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.typesBatiment = response.data;
        } else {
          console.warn('Structure de réponse inattendue, utilisation tableau vide');
          this.typesBatiment = [];
        }
        
        console.log('Types traités:', this.typesBatiment);
        console.log('Est-ce un tableau?', Array.isArray(this.typesBatiment));
        console.log('Longueur:', this.typesBatiment.length);
        
        if (this.typesBatiment.length === 0) {
          this.messageService.add({ 
            severity: 'warn', 
            summary: 'Attention', 
            detail: 'Aucun type de bâtiment disponible. Veuillez en créer d\'abord.' 
          });
        }
        
        // Forcer la détection de changements
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement types:', err);
        this.typesBatiment = []; // Important: réinitialiser en tableau vide
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erreur', 
          detail: 'Impossible de charger les types de bâtiment' 
        });
        this.cdr.detectChanges();
      }
    });
  }

  loadBatiments() {
    if (!this.centreId) {
      console.warn('Pas de centreId');
      return;
    }
    
    this.loadingList = true;
    this.batimentService.getBatimentsByCentre(this.centreId).subscribe({
      next: (batiments) => {
        console.log('Bâtiments reçus:', batiments);
        this.batiments = batiments;
        this.loadingList = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement bâtiments:', err);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erreur', 
          detail: 'Impossible de charger les bâtiments' 
        });
        this.loadingList = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit() {
    if (this.batimentForm.valid && this.centreId) {
      this.loading = true;
      
      const batiment: BatimentModel = {
        ...this.batimentForm.value,
        centrecommercial: this.centreId
      };
      
      console.log('Création bâtiment:', batiment);
      
      this.batimentService.createBatiment(batiment).subscribe({
        next: (result) => {
          console.log('Bâtiment créé:', result);
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Succès', 
            detail: 'Bâtiment créé avec succès' 
          });
          this.batimentForm.reset({
            designation: '',
            typebatiment: null,
            nbrEtage: 1,
            surfaceEtage: 0
          });
          this.loading = false;
          this.loadBatiments(); // Recharger la liste
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erreur création:', err);
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Erreur', 
            detail: 'Échec de la création du bâtiment: ' + (err.message || 'Erreur inconnue')
          });
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  confirmDelete(batiment: BatimentModel) {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer le bâtiment "${batiment.designation}" ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteBatiment(batiment._id!);
      }
    });
  }

  deleteBatiment(id: string) {
    this.batimentService.deleteBatiment(id).subscribe({
      next: () => {
        this.messageService.add({ 
          severity: 'success', 
          summary: 'Succès', 
          detail: 'Bâtiment supprimé avec succès' 
        });
        this.loadBatiments(); // Recharger la liste
      },
      error: (err) => {
        console.error('Erreur suppression:', err);
        this.messageService.add({ 
          severity: 'error', 
          summary: 'Erreur', 
          detail: 'Impossible de supprimer le bâtiment' 
        });
      }
    });
  }

onSearch(event: any) {
  const searchTerm = event.target.value.toLowerCase();
  if (searchTerm) {
    // Filtrer côté client
    this.batimentService.getBatimentsByCentre(this.centreId).subscribe({
      next: (batiments) => {
        this.batiments = batiments.filter(b => {
          // Vérifier le type de typebatiment
          const typeDesignation = typeof b.typebatiment === 'object' && b.typebatiment !== null 
            ? b.typebatiment.designation 
            : '';
          
          return b.designation.toLowerCase().includes(searchTerm) ||
                 typeDesignation.toLowerCase().includes(searchTerm);
        });
      }
    });
  } else {
    this.loadBatiments();
  }
}

  scrollToForm() {
    const formElement = document.querySelector('.creation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goBack() {
    this.router.navigate(['/centreCommercial']);
  }

getTypeDesignation(batiment: BatimentModel): string {
  if (!batiment.typebatiment) return 'N/A';
  
  // Si c'est un objet avec une propriété designation
  if (typeof batiment.typebatiment === 'object' && batiment.typebatiment !== null) {
    return batiment.typebatiment.designation || 'N/A';
  }
  
  // Si c'est un string (ID), retourner un message de chargement
  return '...';
}
}