import { inject, Injectable } from '@angular/core';
import { PPIAlertsGateway } from '../../gateways/ppi/ppi-alerts-gateway';
import { ResponseDTO } from '../../../common/dto/response.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PPIAlertsUsecaseService {

  #gateway = inject(PPIAlertsGateway);

  getAlertsAvances(): Observable<ResponseDTO> {
    return this.#gateway.getAlertsAvances();
  }  

}
