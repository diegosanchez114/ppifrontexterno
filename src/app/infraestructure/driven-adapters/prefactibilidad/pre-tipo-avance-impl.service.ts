import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseListDTO } from '../../../common/dto/response.dto';
import { PreTipoAvanceGateway } from '../../../domain/gateways/prefactibilidad/pre-tipo-avance-gateway';

@Injectable({
  providedIn: 'root'
})
export class PreTipoAvanceServiceImpl implements PreTipoAvanceGateway{  

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/prefactibilidad/PreTipoAvance';

  getAll(): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(this._url);
  }

}
