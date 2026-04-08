import { TestBed } from '@angular/core/testing';

import { PontoService } from './ponto';

describe('Ponto', () => {
  let service: PontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
