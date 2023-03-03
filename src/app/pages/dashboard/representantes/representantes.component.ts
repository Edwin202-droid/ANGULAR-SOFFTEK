import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepresentanteResponse } from './representante-response';
import { PageEvent } from '@angular/material/paginator';
import { RepresentanteService } from '../../../services/representante.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestPaginado } from '../../../utils/request-paginado';
import { Paginado } from '../../../utils/response-paginado';
import { DialogRepresentanteComponent } from './dialog-representante/dialog-representante.component';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styleUrls: ['./representantes.component.scss']
})
export class RepresentantesComponent {

  displayedColumns: string[] = ['nombre', 'telefono', 'direccion', 'empresa' , 'accion'];
  dataSource = new MatTableDataSource<RepresentanteResponse>();
  length = 0;
  pageSize = 0;
  pageEvent!: PageEvent;
  paginaActual = 0;
  
  constructor(public representanteService: RepresentanteService, private dialog: MatDialog){ }

  ngOnInit(): void {
    this.getRepresentantes(1);
  }

  getRepresentantes(numeroPagina:number){
    let paginate = new RequestPaginado();
    paginate.numeroPagina = numeroPagina;
    this.representanteService.getRepresentantePaginado(paginate).subscribe(representantes =>{
      this.dataSource.data = representantes.body || []
      let paginadoAPI = JSON.parse(representantes.headers.get('X-Pagination') || '') as Paginado; 
      this.length = paginadoAPI.TotalCount || 0;
      this.pageSize = paginadoAPI.PageSize || 0;
    });
  }

  openDialog(row?:RepresentanteResponse){
    const ref = this.dialog.open(DialogRepresentanteComponent, {
			data: { info: row },
		});
    ref.afterClosed().subscribe(resp =>{
      if(resp){
        this.getRepresentantes(1);
      }
    })
  }

  paginate(event?:any){
    this.getRepresentantes(event.pageIndex + 1)
    return event
  }
}
