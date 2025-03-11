export class PPIAvanceModel {
    idAvance: string = '';
    idProyecto: string = '';
    idContrato: string = '';
    fecha: Date = new Date();
    porcentajeProgramado: number = 0;
    porcentajeEjecutado: number = 0;
    valorEjecutado: number = 0;
    observaciones: string = '';
    tieneAlerta: boolean = false;
    alertaResuelta: boolean = false;
    fechaCreacion: Date = new Date();
    fechaActualizacion: Date = new Date();
}