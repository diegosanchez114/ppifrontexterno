import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDTO } from "../../../common/dto/response.dto";
import { PPIAvanceModel } from "../../models/ppi/ppi-avance";

@Injectable({
    providedIn: 'root',
})
export abstract class PPIAlertsGateway {
    abstract getAlertsAvances(): Observable<ResponseDTO>;
}