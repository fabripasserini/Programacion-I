import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedidoscancelados } from './pedidoscancelados';

describe('Pedidoscancelados', () => {
  let component: Pedidoscancelados;
  let fixture: ComponentFixture<Pedidoscancelados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pedidoscancelados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pedidoscancelados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
