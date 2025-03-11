export class PPIAlertDTO {

    idContrato: string = '';
    codigoContrato: string = '';
    idEntidadResponsable: string = '';
    nombreEntidad: string = '';
    idAvance: string = '';
    fechaAvance: Date = new Date();
    fechaFinalizacion: Date = new Date();
    tieneAlerta: boolean = false;
    alertaResuelta: boolean = false;

}