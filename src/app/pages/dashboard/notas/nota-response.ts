export class NotaResponse{
    notaId?:string;
    descripcion:string;
    total:number;
    nombreEmpresa:string;
    nombreRepresentante:string;

    constructor(){
        this.descripcion = "";
        this.total = 0;
        this.nombreEmpresa = "";
        this.nombreRepresentante = ""
    }
}