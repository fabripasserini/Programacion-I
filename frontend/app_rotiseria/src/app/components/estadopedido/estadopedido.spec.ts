import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadopedido } from './estadopedido';

describe('Estadopedido', () => {
  let component: Estadopedido;
  let fixture: ComponentFixture<Estadopedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estadopedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estadopedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
