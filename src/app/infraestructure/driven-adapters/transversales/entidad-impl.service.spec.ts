import { TestBed } from '@angular/core/testing';

import { EntidadServiceImpl } from './entidad-impl.service';

describe('EntidadServiceImpl', () => {
  let service: EntidadServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
