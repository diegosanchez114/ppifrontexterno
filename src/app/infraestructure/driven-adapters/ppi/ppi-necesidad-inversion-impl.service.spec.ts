import { TestBed } from '@angular/core/testing';

import { PPINecesidadInversionImpl } from './ppi-necesidad-inversion-impl.service';

describe('PPINecesidadInversionImpl', () => {
  let service: PPINecesidadInversionImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPINecesidadInversionImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
