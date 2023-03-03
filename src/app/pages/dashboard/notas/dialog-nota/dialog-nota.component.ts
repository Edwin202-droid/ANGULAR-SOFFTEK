import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmpresaService } from '../../../../services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoResponse } from '../../productos/producto-response';
import { ProductoService } from '../../../../services/producto.service';
import { RequestPaginado } from '../../../../utils/request-paginado';
import { RepresentanteResponse } from '../../representantes/representante-response';
import { RepresentanteService } from '../../../../services/representante.service';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NotaRequest } from './nota-request';
import { NotaService } from '../../../../services/nota.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-nota',
  templateUrl: './dialog-nota.component.html',
  styleUrls: ['./dialog-nota.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule
  ]
})
export class DialogNotaComponent {

  form = this.fb.group({
    descripcion: new FormControl<string>('',[Validators.required]),
    empresaId: new FormControl<string | null>("",[Validators.required]),
    representanteId: new FormControl<string | null>("",[Validators.required]),
    notaId : new FormControl<string | null>(null)
  });
  empresas$ = this.empresaService.getEmpresas();
  representantes : RepresentanteResponse [] = [];


  dataSource= new MatTableDataSource<ProductoResponse>()
  productos: ProductoResponse[] = [];

  displayedColumns: string[] = ['seleccion','nombre', 'precio', 'cantidad'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogNotaComponent>, public empresaService: EmpresaService,
  public productoService: ProductoService, public representanteService: RepresentanteService, public notaService: NotaService){

  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    let paginate = new RequestPaginado();
    this.productoService.getProductoPaginado(paginate).subscribe(productos =>{
      this.dataSource.data = productos.body || [];
      this.productos = productos.body || [];
    })
  }

  close(){
    this.dialogRef.close(false)
  }
  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid) return;

    let request : NotaRequest = {
      ...(this.form.getRawValue() as NotaRequest)
    }

    let detalles = this.productos.filter(x => x.seleccionado == true && x.cantidad >= 1)
    if(detalles.length == 0){
      this.snackBar.open('Debe seleccionar e introducir las cantidades');
      return;
    }

    request.total = detalles.reduce(function (acc, obj) { return acc + obj.precio * obj.cantidad; }, 0);
    request.detalles = detalles;

    this.notaService.CreateNota(request).subscribe(resp =>{
      this.dialogRef.close(true)
    })


  }

  changeEmpresa(){
    this.form.get('representanteId')?.setValue("");
    this.representanteService.getRepresentantes(this.form.get('empresaId')?.value || "").subscribe(repre =>{
      this.representantes = repre
    });

  }
}
