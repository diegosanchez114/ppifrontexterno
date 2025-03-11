import { TestBed } from '@angular/core/testing';

import { PreTipoAvanceUsecaseService } from './pre-tipo-avance-usecase.service';

describe('PreTipoAvanceUsecaseService', () => {
  let service: PreTipoAvanceUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreTipoAvanceUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
