import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NotasComponent } from './notas/notas.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { RepresentantesComponent } from './representantes/representantes.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: NotasComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'representantes', component: RepresentantesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
