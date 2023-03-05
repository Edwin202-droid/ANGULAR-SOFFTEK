export class NotaForIdResponse{
    descripcion:string;
    nombreEmpresa:string;
    nombreRepresentante:string;
    telefono:string;
    total:number;
    detalles: NotaDetalleResponse[];

    constructor(){
        this.descripcion = "";
        this.nombreEmpresa = "";
        this.nombreRepresentante = "";
        this.telefono = "";
        this.total = 0;
        this.detalles = []
    }
}

export class NotaDetalleResponse{
    nombreProducto:string;
    subtotal:number;
    cantidad:number;

    constructor(){
        this.nombreProducto = "";
        this.subtotal = 0;
        this.cantidad = 0;
    }
}