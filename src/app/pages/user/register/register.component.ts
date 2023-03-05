import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterRequest } from './register-request';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  logo = "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"


  form = this.fb.group({
    nombres: new FormControl<string>('',[Validators.required]),
    apellidos: new FormControl<string>('',[Validators.required]),
    dni: new FormControl<string>('',[Validators.required]),
    email : new FormControl<string>('',[Validators.required, Validators.email]),
    password: new FormControl<string>('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{1,}')]),
  });

  constructor(public fb: FormBuilder, public authService: AuthService,public router: Router){

  }


  register(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;
    
    let user = {... this.form.getRawValue()} as RegisterRequest;

    this.authService.register(user).subscribe(resp =>{
      this.router.navigate(['/dashboard'])
    })
  }
}
