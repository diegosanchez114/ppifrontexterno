import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../common/dto/response.dto";
import { PPINovedadModel } from "../../models/ppi/ppi-novedad";

@Injectable({
    providedIn: 'root',
})
export abstract class PPINovedadGateway {
    abstract create(model: PPINovedadModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PPINovedadModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getAllByIdAvance(idAvance: string): Observable<ResponseDTO>;
}