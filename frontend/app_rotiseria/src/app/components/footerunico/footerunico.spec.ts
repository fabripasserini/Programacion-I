import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footerunico } from './footerunico';

describe('Footerunico', () => {
  let component: Footerunico;
  let fixture: ComponentFixture<Footerunico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footerunico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footerunico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
