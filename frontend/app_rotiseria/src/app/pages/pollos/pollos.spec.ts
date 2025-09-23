import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pollos } from './pollos';

describe('Pollos', () => {
  let component: Pollos;
  let fixture: ComponentFixture<Pollos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pollos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pollos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
