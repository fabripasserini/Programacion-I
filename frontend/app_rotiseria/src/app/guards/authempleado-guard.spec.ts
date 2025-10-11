import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authempleadoGuard } from './authempleado-guard';

describe('authempleadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authempleadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
