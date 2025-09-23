import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedidovacio } from './pedidovacio';

describe('Pedidovacio', () => {
  let component: Pedidovacio;
  let fixture: ComponentFixture<Pedidovacio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pedidovacio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pedidovacio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
