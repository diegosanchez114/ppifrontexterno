import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterventoriaService {

  #service = inject(HttpClient);

  private _url: string = environment.endpoints.api + '/xxxxxx/xxxx';

  constructor() { }

  getDataTest(): Observable<any> {
    return this.#service.get<any>(this._url);
  }

}
