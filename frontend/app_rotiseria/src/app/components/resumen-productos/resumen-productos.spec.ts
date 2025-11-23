import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenProductos } from './resumen-productos';

describe('ResumenProductos', () => {
  let component: ResumenProductos;
  let fixture: ComponentFixture<ResumenProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumenProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumenProductos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
