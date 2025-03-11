import { inject, Injectable } from '@angular/core';
import { PPINecesidadInversionGateway } from '../../gateways/ppi/ppi-necesidad-inversion-gateway';
import { PPINecesidadInversionModel } from '../../models/ppi/ppi-necesidad-inversion';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../../../common/dto/response.dto';

@Injectable({
  providedIn: 'root'
})
export class PPINecesidadInversionUsecaseService {

  #gateway = inject(PPINecesidadInversionGateway);

  create(model: PPINecesidadInversionModel): Observable<ResponseDTO> {
    return this.#gateway.create(model);
  }

  update(id: string, model: PPINecesidadInversionModel): Observable<ResponseDTO> {
    return this.#gateway.update(id, model);
  }

  getById(id: string): Observable<ResponseDTO> {
    return this.#gateway.getById(id);
  }

  getAllByIdContract(id: string): Observable<ResponseDTO> {
    return this.#gateway.getAllByIdContract(id);
  }  
}
