import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseListDTO } from '../../../common/dto/response.dto';
import { PreProyectoGateway } from '../../gateways/prefactibilidad/pre-proyecto-gateway';

@Injectable({
  providedIn: 'root'
})
export class PreProyectoUsecaseService {

  #gateway = inject(PreProyectoGateway);

  getAll(): Observable<ResponseListDTO> {
    return this.#gateway.getAll();
  }

}
