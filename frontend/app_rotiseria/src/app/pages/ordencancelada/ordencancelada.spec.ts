import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordencancelada } from './ordencancelada';

describe('Ordencancelada', () => {
  let component: Ordencancelada;
  let fixture: ComponentFixture<Ordencancelada>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ordencancelada]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ordencancelada);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
