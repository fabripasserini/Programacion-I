import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFooter } from './empleado-footer';

describe('EmpleadoFooter', () => {
  let component: EmpleadoFooter;
  let fixture: ComponentFixture<EmpleadoFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
