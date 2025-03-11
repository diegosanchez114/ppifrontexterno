export class PPIContratoModel {
    idContrato: string = '';
    idProyecto: string = '';
    idEntidadResponsable: string = '';
    codigo: string = '';
    objeto: string = '';
    fechaInicioContrato: Date = new Date();
    fechaTerminacionContrato: Date = new Date();
    valorContrato: number = 0;
    fechaCreacion: Date = new Date();
    fechaActualizacion: Date = new Date();
}