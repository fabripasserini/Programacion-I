import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosClientes } from './pedidos-clientes';

describe('PedidosClientes', () => {
  let component: PedidosClientes;
  let fixture: ComponentFixture<PedidosClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
