import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarOfertas } from './enviar-ofertas';

describe('EnviarOfertas', () => {
  let component: EnviarOfertas;
  let fixture: ComponentFixture<EnviarOfertas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviarOfertas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarOfertas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
