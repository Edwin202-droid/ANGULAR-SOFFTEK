import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate() {
    if (this.authService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
  
}
