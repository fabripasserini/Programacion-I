import { TestBed } from '@angular/core/testing';

import { Reg } from './reg';

describe('Register', () => {
  let service: Reg;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reg);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
