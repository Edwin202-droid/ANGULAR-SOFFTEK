import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotaRequest } from '../pages/dashboard/notas/dialog-nota/nota-request';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotaResponse } from '../pages/dashboard/notas/nota-response';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  apiUrl= environment.apiUrl;
  constructor(public http: HttpClient, public snackBar: MatSnackBar) { }


  getNotas():Observable<NotaResponse[]>{
    return this.http.get<NotaResponse[]>(
      this.apiUrl+'/GetNotas'
    )
  }

  CreateNota(nota:NotaRequest):Observable<any>{
    return this.http.post<any>(
      this.apiUrl+'/CreateNota',
      nota
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
