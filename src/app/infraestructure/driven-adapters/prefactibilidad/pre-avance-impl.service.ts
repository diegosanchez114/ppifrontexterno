import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PreAvanceGateway } from '../../../domain/gateways/prefactibilidad/pre-avance-gateway';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PreAvanceModel } from '../../../domain/models/prefactibilidad/pre-avance';

@Injectable({
  providedIn: 'root'
})
export class PreAvanceServiceImpl implements PreAvanceGateway {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/prefactibilidad/PreAvance';

  create(model: PreAvanceModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PreAvanceModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getAll(id: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

}
