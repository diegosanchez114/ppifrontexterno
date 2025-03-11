import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../common/dto/response.dto";
import { PPIContratoModel } from "../../models/ppi/ppi-contrato";

@Injectable({
    providedIn: 'root',
})
export abstract class PPIContratoGateway {
    abstract create(model: PPIContratoModel): Observable<ResponseDTO>;
    abstract update(id: string, model: PPIContratoModel): Observable<ResponseDTO>;
    abstract getById(id: string): Observable<ResponseDTO>;
    abstract getAllByIdProject(idProject: string): Observable<ResponseDTO>;
    abstract getAllByIdProjectAndIdEntity(idProject: string, idEntity: string): Observable<ResponseDTO>;
}