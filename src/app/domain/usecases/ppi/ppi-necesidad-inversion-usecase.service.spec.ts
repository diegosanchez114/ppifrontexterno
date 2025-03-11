import { TestBed } from '@angular/core/testing';

import { PpiNecesidadInversionUsecaseService } from './ppi-necesidad-inversion-usecase.service';

describe('PpiNecesidadInversionUsecaseService', () => {
  let service: PpiNecesidadInversionUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpiNecesidadInversionUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
