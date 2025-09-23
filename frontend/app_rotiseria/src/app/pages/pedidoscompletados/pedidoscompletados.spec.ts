import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pedidoscompletados } from './pedidoscompletados';

describe('Pedidoscompletados', () => {
  let component: Pedidoscompletados;
  let fixture: ComponentFixture<Pedidoscompletados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pedidoscompletados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pedidoscompletados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
