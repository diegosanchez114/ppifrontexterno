import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../common/dto/response.dto';
import { PPINovedadGateway } from '../../gateways/ppi/ppi-novedad-gateway';
import { PPINovedadModel } from '../../models/ppi/ppi-novedad';

@Injectable({
  providedIn: 'root'
})
export class PPINovedadUsecaseService {

  #gateway = inject(PPINovedadGateway);

  create(model: PPINovedadModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PPINovedadModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#gateway.getById(id);
  }

  getAllByIdAvance(id: string): Observable<ResponseDTO> {
    return this.#gateway.getAllByIdAvance(id);
  }  
}
