import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Carritopedido } from './carritopedido';

describe('Carritopedido', () => {
  let component: Carritopedido;
  let fixture: ComponentFixture<Carritopedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Carritopedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Carritopedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
