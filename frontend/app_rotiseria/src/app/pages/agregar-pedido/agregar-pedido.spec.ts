import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPedido } from './agregar-pedido';

describe('AgregarPedido', () => {
  let component: AgregarPedido;
  let fixture: ComponentFixture<AgregarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
