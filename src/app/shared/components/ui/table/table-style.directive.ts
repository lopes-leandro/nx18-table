import { AfterContentInit, AfterViewInit, Directive, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

export type TableStyleType = "default" | "insurance";

@Directive({
  selector: '[sgcTableStyle]',
  standalone: true
})
export class TableStyleDirective implements OnChanges, AfterViewInit {


  @Input() sgcTableStyle: TableStyleType = "default";

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["sgcTableStyles"]) {
      this.applyStyle();
    }
  }

  ngAfterViewInit(): void {

    this.applyStyle();
  }

  private applyStyle(): void {
    const hostElement = this.el.nativeElement;
    const tableElement = hostElement.querySelector('table');
    // Remove estilos anteriores
    this.renderer.removeClass(tableElement, "default");
    this.renderer.removeClass(tableElement, "insurance");

    // Aplica o estilo selecionado
    this.renderer.addClass(tableElement, `${this.sgcTableStyle}`);

    // Adiciona estilos específicos via CSS inline
    if (this.sgcTableStyle === "insurance") {
      console.log('Aplicando estilo insurance');
      this.applyInsuranceStyle(hostElement);
    } else {
      console.log('Aplicando estilo default');
      this.applyDefaultStyle();
    }
  }

  private applyInsuranceStyle(host: HTMLElement): void {
    this.applyHeaderStyle(host);
  }

  private applyHeaderStyle(host: HTMLElement): void {
    const theadElement = host.querySelectorAll('thead tr');

    // Estiliza o título
    if (theadElement) {
      const headerCells = theadElement[0].querySelectorAll('th');
      console.log(headerCells);

      headerCells.forEach((th: HTMLElement) => {
        this.renderer.setStyle(th, 'background-color', '#003781');
        this.renderer.setStyle(th, 'color', '#ffffff');
        this.renderer.setStyle(th, 'font-weight', 'bold');
        this.renderer.setStyle(th, 'text-align', 'center');
        this.renderer.setStyle(th, 'padding', '16px');
      });
      const firstCell = headerCells[0];
      this.renderer.setStyle(firstCell, 'border-top-left-radius', '5px');

      const lastCell = headerCells[headerCells.length - 1];
      this.renderer.setStyle(lastCell, 'border-top-right-radius', '5px');
    }
  }

  private applyDefaultStyle(): void {
   
  }
}
