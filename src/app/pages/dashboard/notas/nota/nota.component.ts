import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotaService } from '../../../../services/nota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotaForIdResponse } from './nota-response';
import { Subscription } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ]
})
export class NotaComponent {

  private subRouter!: Subscription;
  nota = new NotaForIdResponse();

  constructor(public notaService: NotaService, public router: ActivatedRoute){
    this.subRouter = this.router.params.subscribe(params => {
      this.getNota(params['id'])
    });
  }

  getNota(id:string){
    this.notaService.getNota(id).subscribe(nota =>{
      this.nota = nota
    });
  }

  ngOnDestroy() {
    this.subRouter.unsubscribe();
  }

}
