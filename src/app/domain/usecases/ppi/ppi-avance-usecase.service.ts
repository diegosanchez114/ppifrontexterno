import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIAvanceGateway } from '../../gateways/ppi/ppi-avance-gateway';
import { PPIAvanceModel } from '../../models/ppi/ppi-avance';

@Injectable({
  providedIn: 'root'
})
export class PPIAvanceUsecaseService {

  #gateway = inject(PPIAvanceGateway);

  create(model: PPIAvanceModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PPIAvanceModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#gateway.getById(id);
  }

  getAllByIdContract(id: string): Observable<ResponseDTO> {
    return this.#gateway.getAllByIdContract(id);
  }  

}
