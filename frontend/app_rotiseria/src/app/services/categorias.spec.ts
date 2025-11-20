import { TestBed } from '@angular/core/testing';

import { VerCategorias } from './categorias';

describe('Categorias', () => {
  let service: VerCategorias;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerCategorias);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
