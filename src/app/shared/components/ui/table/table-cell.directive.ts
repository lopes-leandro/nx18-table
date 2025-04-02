import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sgcTableCell]',
  standalone: true
})
export class TableCellDirective {

  @Input() sgcTableCell!: string;
  public template = inject(TemplateRef<any>);
  
}
