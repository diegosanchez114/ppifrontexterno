import { TestBed } from '@angular/core/testing';

import { PreProyectoServiceImpl } from './pre-proyecto-impl.service';

describe('PreProyectoServiceImpl', () => {
  let service: PreProyectoServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreProyectoServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
