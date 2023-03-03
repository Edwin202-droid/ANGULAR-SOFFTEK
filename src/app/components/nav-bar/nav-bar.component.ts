import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    RouterModule
  ]
})
export class NavBarComponent {

  constructor(public authService: AuthService){

  }
}
