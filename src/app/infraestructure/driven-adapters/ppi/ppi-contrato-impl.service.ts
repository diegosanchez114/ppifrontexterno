import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIContratoGateway } from '../../../domain/gateways/ppi/ppi-contrato-gateway';
import { PPIContratoModel } from '../../../domain/models/ppi/ppi-contrato';

@Injectable({
  providedIn: 'root'
})
export class PPIContratoServiceImpl implements PPIContratoGateway {  

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/ppi/PPIContrato';

  create(model: PPIContratoModel): Observable<ResponseDTO> {
    return this.#service.post<ResponseDTO>(this._url, model);
  }

  update(id: string, model: PPIContratoModel): Observable<ResponseDTO> {
    return this.#service.put<ResponseDTO>(`${this._url}/${id}`, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/${id}`);
  }

  getAllByIdProject(id: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byProyecto/${id}`);
  }

  getAllByIdProjectAndIdEntity(idProject: string, idEntity: string): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(`${this._url}/byProyecto/${idProject}/byEntidad/${idEntity}`);
  }
  
}
