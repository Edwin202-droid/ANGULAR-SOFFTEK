export class ProductoResponse{
    productoId:string;
    nombre:string;
    descripcion:string;
    precio:number;

    constructor(){
        this.productoId = "";
        this.nombre = "";
        this.descripcion = "";
        this.precio = 0
    }
}