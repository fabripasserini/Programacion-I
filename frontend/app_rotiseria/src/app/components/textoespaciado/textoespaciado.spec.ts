import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Textoespaciado } from './textoespaciado';

describe('Textoespaciado', () => {
  let component: Textoespaciado;
  let fixture: ComponentFixture<Textoespaciado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Textoespaciado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Textoespaciado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
