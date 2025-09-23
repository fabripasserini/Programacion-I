import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Papas } from './papas';

describe('Papas', () => {
  let component: Papas;
  let fixture: ComponentFixture<Papas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Papas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Papas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
