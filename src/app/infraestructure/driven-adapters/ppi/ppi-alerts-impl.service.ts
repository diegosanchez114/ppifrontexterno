import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../common/dto/response.dto';
import { PPIAlertsGateway } from '../../../domain/gateways/ppi/ppi-alerts-gateway';

@Injectable({
  providedIn: 'root'
})
export class PPIAlertsServiceImpl implements PPIAlertsGateway {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/ppi/PPIAlerts';

  getAlertsAvances(): Observable<ResponseDTO> {
    return this.#service.get<ResponseDTO>(this._url);
  }

}
