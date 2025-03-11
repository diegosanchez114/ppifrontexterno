import { TestBed } from '@angular/core/testing';

import { PPIAvanceUsecaseService } from './ppi-avance-usecase.service';

describe('PPIAvanceUsecaseService', () => {
  let service: PPIAvanceUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPIAvanceUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
