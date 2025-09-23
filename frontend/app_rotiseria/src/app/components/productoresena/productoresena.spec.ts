import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productoresena } from './productoresena';

describe('Productoresena', () => {
  let component: Productoresena;
  let fixture: ComponentFixture<Productoresena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productoresena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productoresena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
