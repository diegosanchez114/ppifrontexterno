import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { UsuarioGateway } from '../../gateways/transversales/usuario-gateway';
import { UsuarioModel } from '../../models/transversales/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioUsecaseService {

  #gateway = inject(UsuarioGateway);

  create(model: UsuarioModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: UsuarioModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseListDTO> {
    return this.#gateway.getById(id);
  }

  getByEmail(email: string): Observable<ResponseDTO> {
    return this.#gateway.getByEmail(email);
  }

  getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO> {
    return this.#gateway.getAll(filter, page, limit);
  }

}
