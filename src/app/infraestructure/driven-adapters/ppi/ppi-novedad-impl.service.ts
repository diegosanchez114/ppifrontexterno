import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPINovedadModel } from '../../../domain/models/ppi/ppi-novedad';
import { PPINovedadGateway } from '../../../domain/gateways/ppi/ppi-novedad-gateway';

@Injectable({
  providedIn: 'root'
})
export class PPINovedadServiceImpl implements PPINovedadGateway {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/ppi/PPINovedad';

  create(model: PPINovedadModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PPINovedadModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getAllByIdAvance(idAvance: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byAvance/${idAvance}`);
  }
}
