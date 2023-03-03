export class ProductoRequest{
    productoId?:string;
    nombre:string;
    descripcion:string;
    precio:number

    constructor(){
        this.nombre = "";
        this.descripcion = "";
        this.precio = 0
    }
}