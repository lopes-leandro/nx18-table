import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sgc-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string | null = null;
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon?: string;
  @Output() action = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.action.emit();
    }
  }
}
