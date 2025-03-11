import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { EntidadGateway } from '../../../domain/gateways/transversales/entidad-gateway';
import { EntidadModel } from '../../../domain/models/transversales/entidad';

@Injectable({
  providedIn: 'root'
})
export class EntidadServiceImpl implements EntidadGateway {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/transversales/Entidad';

  create(model: EntidadModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: EntidadModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getAll(): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(this._url);
  }

}
