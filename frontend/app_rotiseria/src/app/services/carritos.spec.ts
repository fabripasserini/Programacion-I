import { TestBed } from '@angular/core/testing';

import { Carritos } from './carritos';

describe('Carritos', () => {
  let service: Carritos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Carritos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
