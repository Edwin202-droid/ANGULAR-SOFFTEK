import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaResponse } from '../pages/dashboard/empresas/empresa-response';
import { RequestPaginado } from '../utils/request-paginado';
import { Observable, throwError } from "rxjs";
import { EmpresaRequest } from '../pages/dashboard/empresas/dialog-empresa/empresa-request';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  apiUrl= environment.apiUrl;
  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  getEmpresaPaginado(request:RequestPaginado):Observable<HttpResponse<EmpresaResponse[]>>{
    return this.http.post<EmpresaResponse[]>(
        this.apiUrl+'/EmpresaPaginado', 
        request, 
        { observe : 'response'}
        );
  }

  getEmpresas():Observable<EmpresaResponse[]>{
    return this.http.get<EmpresaResponse[]>(this.apiUrl+'/GetEmpresas');
  }

  gestionEmpresa(empresa:EmpresaRequest):Observable<any>{
    return this.http.post<any>(
      this.apiUrl+'/GestionEmpresa',
      empresa
    ).pipe(
      map((resp) => {
        this.snackBar.open(resp.mensaje, undefined, {
          panelClass: ['bg-success', 'text-white'],
        });
      },
      catchError((err:any)=>{
        this.snackBar.open(err.error, undefined, {
          panelClass: ['bg-danger', 'text-white'],
        });
        return throwError(err);
      })
    ))
  }
}
