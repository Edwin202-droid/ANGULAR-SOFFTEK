import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RequestPaginado } from '../utils/request-paginado';
import { Observable, throwError } from 'rxjs';
import { RepresentanteResponse } from '../pages/dashboard/representantes/representante-response';
import { RepresentanteRequest } from '../pages/dashboard/representantes/dialog-representante/representante-request';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  apiUrl= environment.apiUrl;
  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  getRepresentantePaginado(request:RequestPaginado):Observable<HttpResponse<RepresentanteResponse[]>>{
    return this.http.post<RepresentanteResponse[]>(
        this.apiUrl+'/RepresentantePaginado', 
        request, 
        { observe : 'response'}
        );
  }

  gestionRepresentante(representante:RepresentanteRequest):Observable<any>{
    return this.http.post<any>(
      this.apiUrl+'/GestionRepresentante',
      representante
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
