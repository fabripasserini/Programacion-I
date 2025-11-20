import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPedidos } from './modificar-pedidos';

describe('ModificarPedidos', () => {
  let component: ModificarPedidos;
  let fixture: ComponentFixture<ModificarPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPedidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarPedidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
