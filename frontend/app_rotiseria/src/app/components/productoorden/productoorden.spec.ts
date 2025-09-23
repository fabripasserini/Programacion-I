import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productoorden } from './productoorden';

describe('Productoorden', () => {
  let component: Productoorden;
  let fixture: ComponentFixture<Productoorden>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productoorden]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productoorden);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
