import { TestBed } from '@angular/core/testing';

import { ParametricaServiceImpl } from './parametrica-impl.service';

describe('ParametricaServiceImpl', () => {
  let service: ParametricaServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametricaServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
