import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { ParametricaGateway } from '../../gateways/transversales/parametrica-gateway';
import { ParametricaModel } from '../../models/transversales/parametrica';

@Injectable({
  providedIn: 'root'
})
export class ParametricaUsecaseService {

  #gateway = inject(ParametricaGateway);

  create(model: ParametricaModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: ParametricaModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseListDTO> {
    return this.#gateway.getById(id);
  }

  getByName(name: string): Observable<ResponseDTO> {
    return this.#gateway.getByName(name);
  }

  getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO> {
    return this.#gateway.getAll(filter, page, limit);
  }

}
