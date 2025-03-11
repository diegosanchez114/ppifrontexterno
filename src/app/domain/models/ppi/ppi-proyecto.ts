export class PPIProyectoModel {
  idProyecto: string = '';
  idEntidadResponsable: string = '';
  codigo: string = '';
  nombreLargo: string = '';
  nombreCorto: string = '';
  categoria: string = '';
  modo: string = '';
  estaRadicado: boolean = true;
  codigoCorredor: string = '';
  tieneEstudiosYDisenio: boolean = true;
  programa: string = '';
  priorizacionInvias: string = '';
  bpinPng: string = '';
  observaciones: string = '';
  tieneContratos: boolean = false;
  tieneContratosObservacion: string = '';
  fechaCreacion: Date = new Date();
  fechaActualizacion: Date = new Date();  
}