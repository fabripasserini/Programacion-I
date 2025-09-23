import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productocarrito } from './productocarrito';

describe('Productocarrito', () => {
  let component: Productocarrito;
  let fixture: ComponentFixture<Productocarrito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productocarrito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productocarrito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
