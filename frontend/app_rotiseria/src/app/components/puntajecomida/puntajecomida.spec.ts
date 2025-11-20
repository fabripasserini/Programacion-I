import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puntajecomida } from './puntajecomida';

describe('Puntajecomida', () => {
  let component: Puntajecomida;
  let fixture: ComponentFixture<Puntajecomida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Puntajecomida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Puntajecomida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
