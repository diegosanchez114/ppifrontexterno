import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { ParametricaGateway } from '../../../domain/gateways/transversales/parametrica-gateway';
import { ParametricaModel } from '../../../domain/models/transversales/parametrica';
import { RequestUtilsService } from '../../../common/services/request-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ParametricaServiceImpl implements ParametricaGateway{  

  #service = inject(HttpClient);
  #request = inject(RequestUtilsService);

  private _url: string = environment.endpoints.api + '/transversales/Parametrica';

  create(model: ParametricaModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: ParametricaModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getByName(name: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byName/${name}`);
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
