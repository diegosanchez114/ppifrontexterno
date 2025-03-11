import { TestBed } from '@angular/core/testing';

import { PPIContratoUsecaseService } from './ppi-contrato-usecase.service';

describe('PPIContratoUsecaseService', () => {
  let service: PPIContratoUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPIContratoUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
