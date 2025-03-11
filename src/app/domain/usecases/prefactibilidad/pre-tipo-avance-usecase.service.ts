import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseListDTO } from '../../../common/dto/response.dto';
import { PreTipoAvanceGateway } from '../../gateways/prefactibilidad/pre-tipo-avance-gateway';

@Injectable({
  providedIn: 'root'
})
export class PreTipoAvanceUsecaseService {

  #gateway = inject(PreTipoAvanceGateway);

  getAll(): Observable<ResponseListDTO> {
    return this.#gateway.getAll();
  }

}
