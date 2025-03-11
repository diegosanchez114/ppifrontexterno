import { TestBed } from '@angular/core/testing';

import { ParametricaUsecaseService } from './parametrica-usecase.service';

describe('ParametricaUsecaseService', () => {
  let service: ParametricaUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametricaUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
