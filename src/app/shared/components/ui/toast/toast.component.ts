import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToastModel } from './toast.model';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sgc-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(100%)',
          opacity: 0,
        }),
      ),
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1
        }),
      ),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('200ms ease-in')),
    ]),
  ],
})
export class ToastComponent implements OnInit, OnDestroy {
  activeToasts: Array<ToastModel & { id: number, state: 'visible' | 'void' }> = [];
  private subscription = new Subscription();
  private counter = 0;
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.subscription.add(
      this.toastService.toast$.subscribe((toast) => {
        this.showToast(toast);
      })
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private showToast(toast: ToastModel): void {
    const id = this.counter++;
    const newToast = { ...toast, id, state: 'visible' as const };

    this.activeToasts.push(newToast);

    setTimeout(() => {
      this.removeToast(id);
    }, toast.duration);
  }

  removeToast(id: number): void {
    const index = this.activeToasts.findIndex((t) => t.id === id);

    if (index !== -1) {
      this.activeToasts[index].state = 'void';

      setTimeout(() => {
        this.activeToasts = this.activeToasts.filter((t) => t.id !== id)
      }, 200);
    }
  }
}
