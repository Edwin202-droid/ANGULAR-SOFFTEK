import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductoService } from '../../../../services/producto.service';
import { ProductoRequest } from './producto-request';

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.scss'],
  standalone : true,
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DialogProductoComponent {


  form = this.fb.group({
    nombre: new FormControl<string>('',[Validators.required]),
    descripcion: new FormControl<string>('',[Validators.required]),
    precio: new FormControl<number | null>(null,[Validators.required]),
    productoId : new FormControl<string | null>(null)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,
  private dialogRef: MatDialogRef<DialogProductoComponent>, public productoService: ProductoService){

  }
  ngOnInit(): void {
    if(this.data.info){
      this.form.patchValue(this.data.info)
    }
  }

  close(){
    this.dialogRef.close(false)
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }

    let productoRequest : ProductoRequest = {
      ...(this.form.getRawValue() as ProductoRequest)
    }

    this.productoService.gestionProducto(productoRequest).subscribe(resp =>{
      this.dialogRef.close(true)
    })

  }

}
