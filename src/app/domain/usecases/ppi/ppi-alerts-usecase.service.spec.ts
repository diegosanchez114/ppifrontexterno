import { TestBed } from '@angular/core/testing';

import { PpiAlertsUsecaseService } from './ppi-alerts-usecase.service';

describe('PpiAlertsUsecaseService', () => {
  let service: PpiAlertsUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpiAlertsUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
