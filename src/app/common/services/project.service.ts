import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponseListDTO } from '../dto/response.dto';
import { ProyectosDTO } from '../dto/proyectos.dto';
import { ProgressTableDTO } from '../dto/progress-table';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<ResponseListDTO> {
    return this.http.get<ResponseListDTO>("http://localhost:5271/api/Proyecto")
  }

  public createProject(model: ProyectosDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>("http://localhost:5271/api/Proyecto", model)
  }

  public createProgress(model: ProgressTableDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>("http://localhost:5271/api/Avance", model)
  }
}
