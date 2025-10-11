import { TestBed } from '@angular/core/testing';

import { Checkrol } from './checkrol';

describe('Checkrol', () => {
  let service: Checkrol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Checkrol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
