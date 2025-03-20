export class UsuarioModel {
    id: string = '';
    email: string = '';
    identificacion: string = '';
    tipoDocumento: string = '';
    nombres: string = '';
    apellidos: string = '';
    rolId: string = '';
    entityId: string = '';
    numeroTelefono: string = '';
    cargo: string = '';
    fechaCreacion: Date = new Date();
    fechaActualizacion: Date = new Date();
}