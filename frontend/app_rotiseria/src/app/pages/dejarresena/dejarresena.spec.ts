import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dejarresena } from './dejarresena';

describe('Dejarresena', () => {
  let component: Dejarresena;
  let fixture: ComponentFixture<Dejarresena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dejarresena]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dejarresena);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
