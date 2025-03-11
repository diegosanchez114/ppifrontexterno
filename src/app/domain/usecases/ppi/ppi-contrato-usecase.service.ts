import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../../../common/dto/response.dto';
import { PPIContratoGateway } from '../../gateways/ppi/ppi-contrato-gateway';
import { PPIContratoModel } from '../../models/ppi/ppi-contrato';

@Injectable({
  providedIn: 'root'
})
export class PPIContratoUsecaseService {

  #gateway = inject(PPIContratoGateway);

  create(model: PPIContratoModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PPIContratoModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#gateway.getById(id);
  }

  getAllByIdProject(idProject: string): Observable<ResponseListDTO> {
    return this.#gateway.getAllByIdProject(idProject);
  }  

  getAllByIdProjectAndIdEntity(idProject: string, idEntity: string): Observable<ResponseDTO> {
    return this.#gateway.getAllByIdProjectAndIdEntity(idProject, idEntity);
  }
}
