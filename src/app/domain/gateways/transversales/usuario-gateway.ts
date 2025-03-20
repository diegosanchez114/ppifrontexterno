import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO, ResponseListDTO } from "../../../common/dto/response.dto";
import { UsuarioModel } from "../../models/transversales/usuario";

@Injectable({
    providedIn: 'root',
})
export abstract class UsuarioGateway {
    abstract create(model: UsuarioModel): Observable<ResponseDTO>;
    abstract update(id: string, model: UsuarioModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getByEmail(email: string): Observable<ResponseDTO>;
    abstract getAll(filter: any, page: number, limit: number): Observable<ResponseListDTO>;
}