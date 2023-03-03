export class RepresentanteRequest{
    representanteId?:string;
    nombre:string;
    numeroDocumento:string;
    telefono:string;
    empresaId:string;

    constructor(){
        this.nombre = "";
        this.numeroDocumento = "";
        this.telefono = "";
        this.empresaId = "";
    }
}