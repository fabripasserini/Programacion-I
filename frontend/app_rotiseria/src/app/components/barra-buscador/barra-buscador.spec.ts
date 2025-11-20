import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraBuscador } from './barra-buscador';

describe('BarraBuscador', () => {
  let component: BarraBuscador;
  let fixture: ComponentFixture<BarraBuscador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraBuscador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraBuscador);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
