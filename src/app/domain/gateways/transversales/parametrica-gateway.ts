import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO, ResponseListDTO } from "../../../common/dto/response.dto";
import { ParametricaModel } from "../../models/transversales/parametrica";

@Injectable({
    providedIn: 'root',
})
export abstract class ParametricaGateway {
    abstract create(model: ParametricaModel): Observable<ResponseDTO>;
    abstract update(id: string, model: ParametricaModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getByName(name: string): Observable<ResponseDTO>;
    abstract getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO>;
}