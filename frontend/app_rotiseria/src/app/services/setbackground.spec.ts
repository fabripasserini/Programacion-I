import { TestBed } from '@angular/core/testing';

import { Setbackground } from './setbackground';

describe('Setbackground', () => {
  let service: Setbackground;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Setbackground);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
