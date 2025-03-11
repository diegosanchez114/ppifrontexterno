import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../common/dto/response.dto";
import { PPIAvanceModel } from "../../models/ppi/ppi-avance";

@Injectable({
    providedIn: 'root',
})
export abstract class PPIAvanceGateway {
    abstract create(model: PPIAvanceModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PPIAvanceModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getAllByIdContract(idContract: string): Observable<ResponseDTO>;
}