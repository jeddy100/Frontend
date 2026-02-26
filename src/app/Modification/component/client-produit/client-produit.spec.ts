import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProduit } from './client-produit';

describe('ClientProduit', () => {
  let component: ClientProduit;
  let fixture: ComponentFixture<ClientProduit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientProduit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientProduit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
