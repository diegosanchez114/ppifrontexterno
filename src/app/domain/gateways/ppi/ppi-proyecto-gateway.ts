import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO, ResponseListDTO } from "../../../common/dto/response.dto";
import { PPIProyectoModel } from "../../models/ppi/ppi-proyecto";

@Injectable({
    providedIn: 'root',
})
export abstract class PPIProyectoGateway {
    abstract create(model: PPIProyectoModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PPIProyectoModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseListDTO>;
    abstract getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO>;
    abstract getAllByEntity(entity: string, filter: any, page: number, limit: number): Observable<ResponseListDTO>;    
}