import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIProyectoGateway } from '../../gateways/ppi/ppi-proyecto-gateway';
import { PPIProyectoModel } from '../../models/ppi/ppi-proyecto';

@Injectable({
  providedIn: 'root'
})
export class PPIProyectoUsecaseService {

  #gateway = inject(PPIProyectoGateway);

  create(model: PPIProyectoModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PPIProyectoModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#gateway.getById(id);
  }

  getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO> {
    return this.#gateway.getAll(filter, page, limit);
  }
  
  getAllByEntity(entity: string, filter: any, page: number = 1, limit: number = 10): Observable<ResponseListDTO> {
    return this.#gateway.getAllByEntity(entity, filter, page, limit);
  }

}
