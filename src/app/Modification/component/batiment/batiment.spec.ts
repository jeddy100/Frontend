import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Batiment } from './batiment';
import { BatimentService } from '../../service/batiment-service';
import { TypeBatimentService } from '../../service/typebatiment-service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Batiment', () => {
  let component: Batiment;
  let fixture: ComponentFixture<Batiment>;
  let batimentServiceSpy: jasmine.SpyObj<BatimentService>;
  let typeBatimentServiceSpy: jasmine.SpyObj<TypeBatimentService>;

  beforeEach(async () => {
    const batSpy = jasmine.createSpyObj('BatimentService', ['createBatiment']);
    const typeSpy = jasmine.createSpyObj('TypeBatimentService', ['getTypeBatiments']);

    await TestBed.configureTestingModule({
      imports: [Batiment, ReactiveFormsModule],
      providers: [
        { provide: BatimentService, useValue: batSpy },
        { provide: TypeBatimentService, useValue: typeSpy },
        MessageService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Batiment);
    component = fixture.componentInstance;
    batimentServiceSpy = TestBed.inject(BatimentService) as jasmine.SpyObj<BatimentService>;
    typeBatimentServiceSpy = TestBed.inject(TypeBatimentService) as jasmine.SpyObj<TypeBatimentService>;
    typeBatimentServiceSpy.getTypeBatiments.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form when valid', () => {
    batimentServiceSpy.createBatiment.and.returnValue(of({}));
    component.batimentForm.patchValue({
      designation: 'Test Batiment',
      typebatiment: 'type1',
      nbrEtage: 5,
      surfaceEtage: 100
    });
    component.onSubmit();
    expect(batimentServiceSpy.createBatiment).toHaveBeenCalled();
  });
});