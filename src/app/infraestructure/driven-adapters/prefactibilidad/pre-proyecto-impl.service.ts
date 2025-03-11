import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseListDTO } from '../../../common/dto/response.dto';
import { PreProyectoGateway } from '../../../domain/gateways/prefactibilidad/pre-proyecto-gateway';

@Injectable({
  providedIn: 'root'
})
export class PreProyectoServiceImpl implements PreProyectoGateway{
  
  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/prefactibilidad/PreProyecto';
 
  getAll(): Observable<ResponseListDTO> {
    return this.#service.get<ResponseListDTO>(this._url);
  }

}
