export class UserResult {
    nombres: string;
    userName: string;
    token: string;
    isSuccess: boolean;
    message: string;

    constructor(){
        this.nombres = "";
        this.userName = "";
        this.token = "";
        this.isSuccess = false;
        this.message = ""
    }
}