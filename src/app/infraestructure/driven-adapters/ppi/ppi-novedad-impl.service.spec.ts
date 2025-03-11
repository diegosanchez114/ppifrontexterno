import { TestBed } from '@angular/core/testing';

import { PpiNovedadImplService } from './ppi-novedad-impl.service';

describe('PpiNovedadImplService', () => {
  let service: PpiNovedadImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpiNovedadImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
