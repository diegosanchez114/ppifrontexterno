import { TestBed } from '@angular/core/testing';

import { PPIProyectoServiceImpl } from './ppi-proyecto-impl.service';

describe('PPIProyectoServiceImpl', () => {
  let service: PPIProyectoServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PPIProyectoServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
