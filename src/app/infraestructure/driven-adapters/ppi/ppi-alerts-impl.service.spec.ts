import { TestBed } from '@angular/core/testing';

import { PpiAlertsImplService } from './ppi-alerts-impl.service';

describe('PpiAlertsImplService', () => {
  let service: PpiAlertsImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpiAlertsImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
