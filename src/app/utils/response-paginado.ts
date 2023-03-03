export class Paginado{
    TotalPages:number;
    CurrentPage?:number;
    PageSize?:number;
    TotalCount:number;
    Total:number

    constructor(){
        this.TotalPages = 0
        this.TotalCount = 0
        this.Total = 0
    }
}