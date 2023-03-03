import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from './login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  logo = "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"

  form = this.fb.group({
    email : new FormControl<string>('',[Validators.required]),
    password: new FormControl<string>('',[Validators.required]),
  });

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router){

  }

  login(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    
    let user = {... this.form.getRawValue()} as LoginRequest;

    this.authService.login(user).subscribe(resp =>{
      this.router.navigate(['/dashboard'])
    })
  }

}
