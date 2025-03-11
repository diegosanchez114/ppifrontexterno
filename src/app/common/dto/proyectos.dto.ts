export class ProyectosDTO {
    idProyecto?: string = '';
    idSubdireccion: string = '';
    nombreProyecto: string = '';
    objetoProyecto: string = '';
    fechaInicioContrato: Date = new Date();
    fechaFinalContratoContractual: Date = new Date();
    fechaFinalRealContrato: Date = new Date();
    fechaSuscripcionContrato: Date = new Date();    
    observaciones: string = '';
    valorContrastistaInicial: number = 0;
    valorInterventoriaInicial: number = 0;
    fechaCreacion: Date = new Date();
    fechaActualizacion: Date = new Date();
}

