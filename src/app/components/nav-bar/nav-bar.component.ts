import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatToolbarModule } from "@angular/material/toolbar";
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotaHeaderService } from 'src/app/pages/dashboard/notas/notas-header.service';
import { Subscription } from 'rxjs';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    RouterModule,
    MatBadgeModule
  ]
})
export class NavBarComponent {

  subscription!: Subscription;
  cantidadNotas = 0;

  constructor(public authService: AuthService, public notaHeaderService: NotaHeaderService){

    this.subscription = this.notaHeaderService.getMessage().subscribe(data => {
      this.cantidadNotas = data
      localStorage.setItem('CantidadNotas',data)
    });

  }

  ngOnInit(): void {
    if(localStorage.getItem('CantidadNotas')){
      this.cantidadNotas = Number(localStorage.getItem('CantidadNotas')) || 0
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }



}
