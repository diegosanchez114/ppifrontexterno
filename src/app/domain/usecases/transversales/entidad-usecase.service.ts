import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { EntidadGateway } from '../../gateways/transversales/entidad-gateway';
import { EntidadModel } from '../../models/transversales/entidad';

@Injectable({
  providedIn: 'root'
})
export class EntidadUsecaseService {

  #gateway = inject(EntidadGateway);

  create(model: EntidadModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: EntidadModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseListDTO> {
    return this.#gateway.getById(id);
  }

  getAll(): Observable<ResponseDTO> {
    return this.#gateway.getAll();
  }

}
