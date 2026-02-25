import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Typebatiment } from './typebatiment';
import { TypeBatimentService } from '../../service/typebatiment-service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('Typebatiment', () => {
  let component: Typebatiment;
  let fixture: ComponentFixture<Typebatiment>;
  let typeBatimentServiceSpy: jasmine.SpyObj<TypeBatimentService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TypeBatimentService', ['createTypeBatiment', 'getTypeBatiments']);

    await TestBed.configureTestingModule({
      imports: [Typebatiment, ReactiveFormsModule],
      providers: [
        { provide: TypeBatimentService, useValue: spy },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Typebatiment);
    component = fixture.componentInstance;
    typeBatimentServiceSpy = TestBed.inject(TypeBatimentService) as jasmine.SpyObj<TypeBatimentService>;
    typeBatimentServiceSpy.getTypeBatiments.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form when valid', () => {
    typeBatimentServiceSpy.createTypeBatiment.and.returnValue(of({}));
    component.typeForm.patchValue({ designation: 'Test Type' });
    component.onSubmit();
    expect(typeBatimentServiceSpy.createTypeBatiment).toHaveBeenCalled();
  });
});