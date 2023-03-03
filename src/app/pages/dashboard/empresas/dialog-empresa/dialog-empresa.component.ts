import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from '../../../../shared/shared.module';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmpresaRequest } from './empresa-request';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-dialog-empresa',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DialogEmpresaComponent implements OnInit {

  form = this.fb.group({
    nombre: new FormControl<string>('',[Validators.required]),
    direccion: new FormControl<string>('',[Validators.required]),
    telefono: new FormControl<string>('',[Validators.required]),
    empresaId : new FormControl<string | null>(null)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder,
  private dialogRef: MatDialogRef<DialogEmpresaComponent>, public empresaService: EmpresaService){

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

    let empresaRequest : EmpresaRequest = {
      ...(this.form.getRawValue() as EmpresaRequest)
    }

    this.empresaService.gestionEmpresa(empresaRequest).subscribe(resp =>{
      this.dialogRef.close(true)
    })

  }
}
