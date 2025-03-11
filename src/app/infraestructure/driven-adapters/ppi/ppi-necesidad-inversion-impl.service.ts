import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PPINecesidadInversionGateway } from '../../../domain/gateways/ppi/ppi-necesidad-inversion-gateway';
import { Observable } from 'rxjs';
import { PPINecesidadInversionModel } from '../../../domain/models/ppi/ppi-necesidad-inversion';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class PPINecesidadInversionImpl implements PPINecesidadInversionGateway {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/ppi/PPINecesidadInversion';

  create(model: PPINecesidadInversionModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PPINecesidadInversionModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getAllByIdContract(idContract: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byContrato/${idContract}`);
  }
}
