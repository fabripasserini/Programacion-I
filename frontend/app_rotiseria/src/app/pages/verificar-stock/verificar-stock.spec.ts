import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarStock } from './verificar-stock';

describe('VerificarStock', () => {
  let component: VerificarStock;
  let fixture: ComponentFixture<VerificarStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
