import { TestBed } from '@angular/core/testing';

import { PreTipoAvanceServiceImpl } from './pre-tipo-avance-impl.service';

describe('PreTipoAvanceServiceImpl', () => {
  let service: PreTipoAvanceServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreTipoAvanceServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
