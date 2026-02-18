import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Centre } from './centre';

describe('Centre', () => {
  let component: Centre;
  let fixture: ComponentFixture<Centre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Centre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Centre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
