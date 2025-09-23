import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Titulos } from './titulos';

describe('Titulos', () => {
  let component: Titulos;
  let fixture: ComponentFixture<Titulos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Titulos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Titulos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
