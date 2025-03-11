import { TestBed } from '@angular/core/testing';

import { PreProyectoUsecaseService } from './pre-proyecto-usecase.service';

describe('PreProyectoUsecaseService', () => {
  let service: PreProyectoUsecaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreProyectoUsecaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
