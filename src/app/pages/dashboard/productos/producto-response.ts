export class ProductoResponse{
    productoId:string;
    nombre:string;
    descripcion:string;
    precio:number;

    seleccionado:boolean;
    cantidad:number;

    constructor(){
        this.productoId = "";
        this.nombre = "";
        this.descripcion = "";
        this.precio = 0;
        this.seleccionado = false;
        this.cantidad = 0
    }
}