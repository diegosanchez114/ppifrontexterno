import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIProyectoGateway } from '../../../domain/gateways/ppi/ppi-proyecto-gateway';
import { PPIProyectoModel } from '../../../domain/models/ppi/ppi-proyecto';
import { RequestUtilsService } from '../../../common/services/request-utils.service';

@Injectable({
  providedIn: 'root'
})
export class PPIProyectoServiceImpl implements PPIProyectoGateway{
  
  #service = inject(HttpClient);
  #request = inject(RequestUtilsService);

  private _url: string = environment.endpoints.api + '/ppi/PPIProyecto';

  create(model: PPIProyectoModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PPIProyectoModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }
  
  getAll(filter: any, page: number = 1, limit: number = 10): Observable<ResponseListDTO> {
    const query = {
      filter: filter,
      page: page,
      limit: limit
    };
    const queryString = this.#request.jsonToQueryStringParams(query);
    return this.#service.get<ResponseListDTO>(`${this._url}?${queryString}`);
  }

  getAllByEntity(entity: string, filter: any, page: number = 1, limit: number = 10): Observable<ResponseListDTO> {
    const query = {
      filter: filter,
      page: page,
      limit: limit
    };
    const queryString = this.#request.jsonToQueryStringParams(query);
    return this.#service.get<ResponseListDTO>(`${this._url}/byEntidad/${entity}?${queryString}`);
  }
  
}
