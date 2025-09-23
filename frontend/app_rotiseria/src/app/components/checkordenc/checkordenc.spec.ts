import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Checkordenc } from './checkordenc';

describe('Checkordenc', () => {
  let component: Checkordenc;
  let fixture: ComponentFixture<Checkordenc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkordenc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Checkordenc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
