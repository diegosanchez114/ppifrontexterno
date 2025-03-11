import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../common/dto/response.dto";
import { PPINecesidadInversionModel } from "../../models/ppi/ppi-necesidad-inversion";

@Injectable({
    providedIn: 'root',
})
export abstract class PPINecesidadInversionGateway {
    abstract create(model: PPINecesidadInversionModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PPINecesidadInversionModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getAllByIdContract(idContract: string): Observable<ResponseDTO>;
}