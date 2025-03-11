import { TestBed } from '@angular/core/testing';

import { EntidadUsecaseService } from './entidad-usecase.service';

describe('EntidadUsecaseService', () => {
  let service: EntidadUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
