import { TestBed } from '@angular/core/testing';

import { PPIProyectoUsecaseService } from './ppi-proyecto-usecase.service';

describe('PPIProyectoUsecaseService', () => {
  let service: PPIProyectoUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPIProyectoUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
