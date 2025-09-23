import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agregarproducto } from './agregarproducto';

describe('Agregarproducto', () => {
  let component: Agregarproducto;
  let fixture: ComponentFixture<Agregarproducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agregarproducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agregarproducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
