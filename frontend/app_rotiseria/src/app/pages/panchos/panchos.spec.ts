import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Panchos } from './panchos';

describe('Panchos', () => {
  let component: Panchos;
  let fixture: ComponentFixture<Panchos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Panchos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Panchos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
