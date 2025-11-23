import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authadminempleadoGuard } from './authadminempleado-guard';

describe('authadminempleadoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authadminempleadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
