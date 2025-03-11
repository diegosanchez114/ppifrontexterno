import { TestBed } from '@angular/core/testing';

import { PPINovedadUsecaseService } from './ppi-novedad-usecase.service';

describe('PPINovedadUsecaseService', () => {
  let service: PPINovedadUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPINovedadUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
