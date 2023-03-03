import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestPaginado } from '../utils/request-paginado';
import { Observable, throwError } from 'rxjs';
import { ProductoResponse } from '../pages/dashboard/productos/producto-response';
import { ProductoRequest } from '../pages/dashboard/productos/dialog-producto/producto-request';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  apiUrl= environment.apiUrl;
  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }

  getProductoPaginado(request:RequestPaginado):Observable<HttpResponse<ProductoResponse[]>>{
    return this.http.post<ProductoResponse[]>(
        this.apiUrl+'/ProductoPaginado', 
        request, 
        { observe : 'response'}
        );
  }

  gestionProducto(producto:ProductoRequest):Observable<any>{
    return this.http.post<any>(
      this.apiUrl+'/GestionProducto',
      producto
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
