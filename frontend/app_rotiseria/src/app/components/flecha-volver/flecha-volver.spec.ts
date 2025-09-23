import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlechaVolver } from './flecha-volver';

describe('FlechaVolver', () => {
  let component: FlechaVolver;
  let fixture: ComponentFixture<FlechaVolver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlechaVolver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlechaVolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
