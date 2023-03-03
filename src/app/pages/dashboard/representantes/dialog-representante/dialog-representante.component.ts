import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RepresentanteService } from '../../../../services/representante.service';
import { RepresentanteRequest } from './representante-request';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-dialog-representante',
  templateUrl: './dialog-representante.component.html',
  styleUrls: ['./dialog-representante.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DialogRepresentanteComponent {


  form = this.fb.group({
    nombre: new FormControl<string>('',[Validators.required]),
    numeroDocumento: new FormControl<string>('',[Validators.required]),
    telefono: new FormControl<string>('',[Validators.required]),
    empresaId : new FormControl<string>('',[Validators.required]),
    representanteId: new FormControl<string | null>(null),
  });
  
  empresas$ = this.empresaService.getEmpresas();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public empresaService: EmpresaService ,
  private dialogRef: MatDialogRef<DialogRepresentanteComponent>, public representanteService: RepresentanteService){

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

    let representanteRequest : RepresentanteRequest = {
      ...(this.form.getRawValue() as RepresentanteRequest)
    }

    this.representanteService.gestionRepresentante(representanteRequest).subscribe(resp =>{
      this.dialogRef.close(true)
    })

  }

}
