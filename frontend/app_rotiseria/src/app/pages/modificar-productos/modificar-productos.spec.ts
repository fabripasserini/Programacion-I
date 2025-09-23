import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductos } from './modificar-productos';

describe('ModificarProductos', () => {
  let component: ModificarProductos;
  let fixture: ComponentFixture<ModificarProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
