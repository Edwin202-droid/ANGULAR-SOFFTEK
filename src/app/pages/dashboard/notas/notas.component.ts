import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNotaComponent } from './dialog-nota/dialog-nota.component';
import { NotaService } from '../../../services/nota.service';
import { NotaResponse } from './nota-response';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent {

  notas : NotaResponse[]=[];

  constructor(private dialog: MatDialog, public notaService: NotaService){
    
  }

  ngOnInit(): void {
    this.getNotas();
  }

  getNotas(){
    this.notaService.getNotas().subscribe(notas =>{
      this.notas = notas;
    });
  }

  openDialog(row?:any){
    const ref = this.dialog.open(DialogNotaComponent, {
			data: { info: row },
		});
    ref.afterClosed().subscribe(resp =>{
      if(resp){
        this.getNotas();
      }
    })
  }

}
