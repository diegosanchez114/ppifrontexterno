import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseListDTO } from "../../../common/dto/response.dto";

@Injectable({
    providedIn: 'root',
})
export abstract class PreProyectoGateway {
    abstract getAll(): Observable<ResponseListDTO>;
}