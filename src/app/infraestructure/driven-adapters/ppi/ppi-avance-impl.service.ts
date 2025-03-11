import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIAvanceGateway } from '../../../domain/gateways/ppi/ppi-avance-gateway';
import { PPIAvanceModel } from '../../../domain/models/ppi/ppi-avance';

@Injectable({
  providedIn: 'root'
})
export class PPIAvanceServiceImpl implements PPIAvanceGateway {
  
  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/ppi/PPIAvance';

  create(model: PPIAvanceModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PPIAvanceModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getAllByIdContract(idContract: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byContrato/${idContract}`);
  }

}
