import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.obtenerToken();
    if(this.tokenExpirado()){
      this.authService.logOut();
    }else{
      //Token no expirado
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      })
    }
    return next.handle(req);
  }

  tokenExpirado() {
    const token = this.authService.obtenerToken();    
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(token || '')) {
        return true;
    }
    return false;
  }
}
