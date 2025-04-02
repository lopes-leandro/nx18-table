import { Component, ContentChild, ContentChildren, Input, input, QueryList, TemplateRef } from '@angular/core';
import { TableColumn } from './table-column.model';
import { TableCellDirective } from './table-cell.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sgc-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @ContentChildren(TableCellDirective) cellTemplates!: QueryList<TableCellDirective>;
  @ContentChild("actions") actionsTemplate?: TemplateRef<any>;

  getCellTemplate(column: TableColumn<T>): TemplateRef<any> | null{
    if (!column.cellTemplate) return null;

    const directive = this.cellTemplates.find((d) => d.sgcTableCell === column.cellTemplate);
    return directive ? directive.template : null;
  }

  getCellValue(item: T, column: TableColumn<T>): any {
    const field = column.field as string;
    return field.split('.').reduce((obj, key) => obj && obj[key], item as any);
  }
}
