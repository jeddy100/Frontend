import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CentreService } from '../../service/centre-service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('Centre', () => {
  let component: Centre;
  let fixture: ComponentFixture<Centre>;
  let centreServiceSpy: jasmine.SpyObj<CentreService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CentreService', ['createCentre', 'getTypesBatiment']);

    await TestBed.configureTestingModule({
      imports: [Centre, ReactiveFormsModule],
      providers: [
        { provide: CentreService, useValue: spy },
        MessageService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Centre);
    component = fixture.componentInstance;
    centreServiceSpy = TestBed.inject(CentreService) as jasmine.SpyObj<CentreService>;
    centreServiceSpy.getTypesBatiment.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a building', () => {
    component.ajouterBatiment();
    expect(component.batiments.length).toBe(1);
  });

  it('should remove a building', () => {
    component.ajouterBatiment();
    component.supprimerBatiment(0);
    expect(component.batiments.length).toBe(0);
  });

  it('should submit form when valid', () => {
    centreServiceSpy.createCentre.and.returnValue(of({ designation: 'Test Centre', heure_ouverture: '09:00', heure_fermeture: '18:00' }));
    component.centreForm.patchValue({ designation: 'Test Centre', heure_ouverture: '09:00', heure_fermeture: '18:00' });
    component.onSubmit();
    expect(centreServiceSpy.createCentre).toHaveBeenCalled();
  });
});
