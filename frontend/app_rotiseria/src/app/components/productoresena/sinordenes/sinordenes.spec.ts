import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sinordenes } from './sinordenes';

describe('Sinordenes', () => {
  let component: Sinordenes;
  let fixture: ComponentFixture<Sinordenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sinordenes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sinordenes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
