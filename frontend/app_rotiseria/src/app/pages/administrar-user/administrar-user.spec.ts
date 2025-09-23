import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarUser } from './administrar-user';

describe('AdministrarUser', () => {
  let component: AdministrarUser;
  let fixture: ComponentFixture<AdministrarUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrarUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrarUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
