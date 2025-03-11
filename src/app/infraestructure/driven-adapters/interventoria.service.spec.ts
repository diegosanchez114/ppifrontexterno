import { TestBed } from '@angular/core/testing';

import { InterventoriaService } from './interventoria.service';

describe('InterventoriaService', () => {
  let service: InterventoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterventoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
