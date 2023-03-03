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

@NgModule({
  declarations: [
    DashboardComponent,
    NotasComponent,
    RepresentantesComponent,
    EmpresasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NavBarComponent,
    MatToolbarModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
