import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { RequestUtilsService } from '../../../common/services/request-utils.service';
import { UsuarioGateway } from '../../../domain/gateways/transversales/usuario-gateway';
import { UsuarioModel } from '../../../domain/models/transversales/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceImpl implements UsuarioGateway{  

  #service = inject(HttpClient);
  #request = inject(RequestUtilsService);

  private _url: string = environment.endpoints.api + '/transversales/User';

  create(model: UsuarioModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: UsuarioModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getByEmail(email: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byEmail/${email}`);
  }

  getAll(filter: any, page: number = 1, limit: number = 10): Observable<ResponseDTO> {
    const query = {
      filter: filter,
      page: page,
      limit: limit
    };
    const queryString = this.#request.jsonToQueryStringParams(query);
    return this.#service.get<ResponseListDTO>(`${this._url}?${queryString}`);
  } 
  
}
