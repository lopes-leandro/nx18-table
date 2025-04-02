import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastModel } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastModel>();

  toast$ = this.toastSubject.asObservable();

  show(toast: ToastModel): void {
    this.toastSubject.next({
      ...toast,
      duration: toast.duration || 3000
    });
  }

  constructor() { }
}
