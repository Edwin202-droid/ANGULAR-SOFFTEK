import { ProductoResponse } from '../../productos/producto-response';
export class NotaRequest{
    descripcion:string;
    empresaId:string;
    representanteId:string;

    detalles?: ProductoResponse[];
    total?:number;
    usuarioId?:string;
    constructor(){
        this.descripcion = "";
        this.empresaId = "";
        this.representanteId = "";
    }
}