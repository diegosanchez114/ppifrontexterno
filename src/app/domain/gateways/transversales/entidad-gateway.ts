import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO, ResponseListDTO } from "../../../common/dto/response.dto";
import { EntidadModel } from "../../models/transversales/entidad";

@Injectable({
    providedIn: 'root',
})
export abstract class EntidadGateway {
    abstract create(model: EntidadModel): Observable<ResponseDTO>;
    abstract update(id: string, model: EntidadModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseListDTO>;
    abstract getAll(): Observable<ResponseDTO>;
}