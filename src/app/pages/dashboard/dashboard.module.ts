import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NotasComponent } from './notas/notas.component';
import { RepresentantesComponent } from './representantes/representantes.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { SharedModule } from '../../shared/shared.module';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from "@angular/material/paginator";
import { ProductosComponent } from './productos/productos.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../services/interceptor.service';

@NgModule({
  declarations: [
    DashboardComponent,
    NotasComponent,
    RepresentantesComponent,
    EmpresasComponent,
    ProductosComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NavBarComponent,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCardModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ]
})
export class DashboardModule { }
