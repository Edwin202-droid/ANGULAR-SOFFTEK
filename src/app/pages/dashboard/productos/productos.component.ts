import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoResponse } from './producto-response';
import { PageEvent } from '@angular/material/paginator';
import { ProductoService } from '../../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { RequestPaginado } from '../../../utils/request-paginado';
import { Paginado } from '../../../utils/response-paginado';
import { DialogProductoComponent } from './dialog-producto/dialog-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'accion'];
  dataSource = new MatTableDataSource<ProductoResponse>();
  length = 0;
  pageSize = 0;
  pageEvent!: PageEvent;
  paginaActual = 0;
  
  constructor(public productoService: ProductoService, private dialog: MatDialog){ }

  ngOnInit(): void {
    this.getProductos(1);
  }

  getProductos(numeroPagina:number){
    let paginate = new RequestPaginado();
    paginate.numeroPagina = numeroPagina;
    this.productoService.getProductoPaginado(paginate).subscribe(productos =>{
      this.dataSource.data = productos.body || []
      let paginadoAPI = JSON.parse(productos.headers.get('X-Pagination') || '') as Paginado; 
      this.length = paginadoAPI.TotalCount || 0;
      this.pageSize = paginadoAPI.PageSize || 0;
    });
  }

  openDialog(row?:ProductoResponse){
    const ref = this.dialog.open(DialogProductoComponent, {
			data: { info: row },
		});
    ref.afterClosed().subscribe(resp =>{
      if(resp){
        this.getProductos(1);
      }
    })
  }

  paginate(event?:any){
    this.getProductos(event.pageIndex + 1)
    return event
  }

}
