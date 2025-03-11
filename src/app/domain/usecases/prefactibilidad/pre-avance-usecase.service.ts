import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PreAvanceGateway } from '../../gateways/prefactibilidad/pre-avance-gateway';
import { PreAvanceModel } from '../../models/prefactibilidad/pre-avance';

@Injectable({
  providedIn: 'root'
})
export class PreAvanceUsecaseService {

  #gateway = inject(PreAvanceGateway);

  create(model: PreAvanceModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PreAvanceModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getAll(id: string): Observable<ResponseListDTO> {
    return this.#gateway.getAll(id);
  }

}
