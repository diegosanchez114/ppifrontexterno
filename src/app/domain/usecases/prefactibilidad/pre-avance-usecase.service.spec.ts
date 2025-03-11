import { TestBed } from '@angular/core/testing';

import { PreAvanceUsecaseService } from './pre-avance-usecase.service';

describe('PreAvanceUsecaseService', () => {
  let service: PreAvanceUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreAvanceUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
