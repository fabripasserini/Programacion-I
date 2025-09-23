import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carritoconproductos } from './carritoconproductos';

describe('Carritoconproductos', () => {
  let component: Carritoconproductos;
  let fixture: ComponentFixture<Carritoconproductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carritoconproductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carritoconproductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
