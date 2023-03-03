import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterRequest } from '../pages/user/register/register-request';
import { Observable, throwError } from 'rxjs';
import { UserResult } from '../utils/user-request';
import { map, catchError } from 'rxjs/operators';
import { LoginRequest } from '../pages/user/login/login-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl= environment.apiUrl;
  token = "";
  constructor(public http: HttpClient, public snackBar: MatSnackBar, public router: Router) { 
    this.cargarStorage()
  }

  cargarStorage(){
    if(localStorage.getItem('BearerToken')){
      this.token = localStorage.getItem('BearerToken')||'{}';
    }else{
      this.token = '';
    }
  }

  register(usuario:RegisterRequest):Observable<any>{
    return this.http.post<UserResult>(this.apiUrl+'/GestionUsuario', usuario).pipe(
      map((resp:UserResult) =>{
        localStorage.setItem('BearerToken',resp?.token);
        localStorage.setItem('Nombres',resp?.nombres);
        this.token = resp.token;
        this.snackBar.open(resp.message, undefined, {
          panelClass: ['bg-success', 'text-white'],
        });
      }),
      catchError((err:any)=>{
        this.snackBar.open(err.error, undefined, {
          panelClass: ['bg-danger', 'text-white'],
        });
        return throwError(err);
      }) 
    )
  }


  estaLogueado(){
    return (this.token?.length > 5)? true : false;
  }

  obtenerToken(){
    return localStorage.getItem('BearerToken');
  }


  login(usuario:LoginRequest):Observable<any>{
    return this.http.post<UserResult>(this.apiUrl+'/Login', usuario).pipe(
      map((resp:UserResult) =>{
        localStorage.setItem('BearerToken',resp?.token);
        localStorage.setItem('Nombres',resp?.nombres);
        this.token = resp.token;
        this.snackBar.open(resp.message, undefined, {
          panelClass: ['bg-success', 'text-white'],
        });
      }),
      catchError((err:any)=>{
        this.snackBar.open(err.error, undefined, {
          panelClass: ['bg-danger', 'text-white'],
        });
        return throwError(err);
      }) 
    )
  }


  logOut(){

    localStorage.removeItem('BearerToken');
    this.token = "";
    this.router.navigate(['/login']);
  }


}
