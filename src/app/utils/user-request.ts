export class UserResult {
    nombres: string;
    userName: string;
    token: string;
    isSuccess: boolean;
    message: string;
    userId:string;
    constructor(){
        this.nombres = "";
        this.userName = "";
        this.token = "";
        this.isSuccess = false;
        this.message = "";
        this.userId = ""
    }
}