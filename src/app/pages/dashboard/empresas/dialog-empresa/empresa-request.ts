export class EmpresaRequest{
    empresaId?:string;
    nombre:string;
    direccion:string;
    telefono:string;

    constructor(){
        this.nombre = "";
        this.direccion = "";
        this.telefono = "";
    }
}