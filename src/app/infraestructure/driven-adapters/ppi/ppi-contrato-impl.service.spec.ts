import { TestBed } from '@angular/core/testing';

import { PPIContratoServiceImpl } from './ppi-contrato-impl.service';

describe('PPIContratoServiceImpl', () => {
  let service: PPIContratoServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPIContratoServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
