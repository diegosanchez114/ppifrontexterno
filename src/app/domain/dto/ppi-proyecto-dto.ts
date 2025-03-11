import { PPIProyectoModel } from "../models/ppi/ppi-proyecto";

export class PPIProyectoDTO extends PPIProyectoModel {

    nombreEntidad: string = '';    
    nombreCategoria: string = '';
    nombreModo: string = '';
    nombrePrograma: string = '';
    nombrePriorizacionInvias: string = '';
    totalPorcentajeEjecutado: number = 0;
    totalValorEjecutado: string = '';
    cantContratos: number = 0;

    constructor() {
        super();
    }

}