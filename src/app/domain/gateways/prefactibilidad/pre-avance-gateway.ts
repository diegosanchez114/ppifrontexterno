import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO, ResponseListDTO } from "../../../common/dto/response.dto";
import { PreAvanceModel } from "../../models/prefactibilidad/pre-avance";

@Injectable({
    providedIn: 'root',
})
export abstract class PreAvanceGateway {
    abstract create(model: PreAvanceModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PreAvanceModel): Observable<ResponseDTO>;
    abstract getAll(id: string): Observable<ResponseListDTO>;
}