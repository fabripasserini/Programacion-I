import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPedidos } from './estado-pedidos';

describe('EstadoPedidos', () => {
  let component: EstadoPedidos;
  let fixture: ComponentFixture<EstadoPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
