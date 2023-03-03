import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../../services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaResponse } from './empresa-response';
import { RequestPaginado } from 'src/app/utils/request-paginado';
import { Paginado } from 'src/app/utils/response-paginado';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEmpresaComponent } from './dialog-empresa/dialog-empresa.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements  OnInit {
  displayedColumns: string[] = ['nombre', 'telefono', 'direccion', 'accion'];
  dataSource = new MatTableDataSource<EmpresaResponse>();
  length = 0;
  pageSize = 0;
  pageEvent!: PageEvent;
  paginaActual = 0;
  
  constructor(public empresaService: EmpresaService, private dialog: MatDialog){ }

  ngOnInit(): void {
    this.getEmpresas(1);
  }

  getEmpresas(numeroPagina:number){
    let paginate = new RequestPaginado();
    paginate.numeroPagina = numeroPagina;
    this.empresaService.getEmpresaPaginado(paginate).subscribe(empresas =>{
      this.dataSource.data = empresas.body || []
      let paginadoAPI = JSON.parse(empresas.headers.get('X-Pagination') || '') as Paginado; 
      this.length = paginadoAPI.TotalCount || 0;
      this.pageSize = paginadoAPI.PageSize || 0;
    });
  }

  openDialog(row?:EmpresaResponse){
    const ref = this.dialog.open(DialogEmpresaComponent, {
			data: { info: row },
		});
    ref.afterClosed().subscribe(resp =>{
      if(resp){
        this.getEmpresas(1);
      }
    })
  }

  paginate(event?:any){
    this.getEmpresas(event.pageIndex + 1)
    return event
  }
}
