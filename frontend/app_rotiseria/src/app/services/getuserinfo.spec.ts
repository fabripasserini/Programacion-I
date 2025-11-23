import { TestBed } from '@angular/core/testing';

import { GetUserInfo } from './getuserinfo';

describe('GetUserInfo', () => {
  let service: GetUserInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
