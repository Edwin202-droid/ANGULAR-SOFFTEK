export class RegisterRequest{
    nombres:string;
    apellidos:string;
    email:string;
    password:string;
    dni:string;
    constructor(){
        this.nombres = "";
        this.apellidos = "";
        this.email = "";
        this.password = "";
        this.dni = "";
    }
}