import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class NotaHeaderService {

  private subject = new Subject<number>();

  constructor() { }

  sendMessage(cantidad: number) {
    this.subject.next(cantidad);
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }

}