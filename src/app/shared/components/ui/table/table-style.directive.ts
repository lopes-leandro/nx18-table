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
    // const hostElement = this.el.nativeElement;

    // Remove estilos anteriores
    // this.renderer.removeClass(hostElement, "table-style-default");
    // this.renderer.removeClass(hostElement, "table-style-insurance");

    // Aplica o estilo selecionado
    // this.renderer.addClass(hostElement, `table-style-${this.sgcTableStyle}`);

    // Adiciona estilos específicos via CSS inline
    if (this.sgcTableStyle === "insurance") {
      console.log('Aplicando estilo insurance');
      this.applyInsuranceStyle();
    } else {
      console.log('Aplicando estilo default');
      this.applyDefaultStyle();
    }
  }

  private applyInsuranceStyle(): void {}

  private applyInsuranceStyle_old(): void {

    // Seleciona os elementos que serão estilizados
    const hostElement = this.el.nativeElement;
    const tableElement = hostElement.querySelector('table');
    const theadElement = hostElement.querySelectorAll('thead tr');
    // const thElements = hostElement.querySelectorAll('th');
    const trElements = hostElement.querySelectorAll('tbody tr');
    const tdElements = hostElement.querySelectorAll('td');


    console.log(hostElement);
    console.log(theadElement);


    // Estiliza a tabela
    if (tableElement) {
      this.renderer.setStyle(tableElement, 'width', '100%');
      this.renderer.setStyle(tableElement, 'border-collapse', 'collapse');
    }

    // Estiliza o título
    if (theadElement) {
      const headerCells = theadElement[0].querySelectorAll('th');
      console.log(headerCells);

      headerCells.forEach((th: HTMLElement) => {
        this.renderer.setStyle(th, 'background-color', '#003781');
        this.renderer.setStyle(th, 'color', '#ffffff');
        this.renderer.setStyle(th, 'font-weight', 'bold');
        this.renderer.setStyle(th, 'text-align', 'center');
        this.renderer.setStyle(th, 'padding', '12px');
      });
      const firstCell = headerCells[0];
      this.renderer.setStyle(firstCell, 'border-top-left-radius', '5px');

      const lastCell = headerCells[headerCells.length - 1];
      this.renderer.setStyle(lastCell, 'border-top-right-radius', '5px');
    }

    // Estiliza o cabeçalho
    // thElements.forEach((th: HTMLElement) => {
    //   this.renderer.setStyle(th, 'background-color', '#f5f5f5');
    //   this.renderer.setStyle(th, 'color', '#333333');
    //   this.renderer.setStyle(th, 'border', '1px solid #e0e0e0');
    //   this.renderer.setStyle(th, 'font-weight', '400');
    // });

    // Estiliza as linhas
    trElements.forEach((tr: HTMLElement) => {
      this.renderer.setStyle(tr, 'background-color', '#ffffff');
      this.renderer.setStyle(tr, 'border-bottom', '1px solid #e0e0e0');
    });

    // Estiliza as células
    tdElements.forEach((td: HTMLElement) => {
      this.renderer.setStyle(td, 'border', '1px solid #e0e0e0');

      // Se a célula tem a classe text-rightm matém o alinhamento
      if (!td.classList.contains('text-right') && !td.classList.contains('text-center')) {
        this.renderer.setStyle(td, 'text-align', 'left');
      }
    });
  }

  private applyDefaultStyle(): void {
    const hostElement = this.el.nativeElement;
    const titleElement = hostElement.querySelector('.table-title');
    const thElements = hostElement.querySelectorAll('th');
    const trElements = hostElement.querySelectorAll('tbody tr');

    // Oculta o título
    if (titleElement) {
      this.renderer.setStyle(titleElement, 'display', 'none');
    }

    // Estilo padrão para cabeçalho
    thElements.forEach((th: HTMLElement) => {
      this.renderer.setStyle(th, 'background-color', '#004080');
      this.renderer.setStyle(th, 'color', '#ffffff');
      this.renderer.setStyle(th, 'border', 'none');
    });

    // Estilo padrão para linhas
    trElements.forEach((tr: HTMLElement, index: number) => {
      if (index % 2 === 1) {
        this.renderer.setStyle(tr, 'background-color', '#f5f5f5');
      } else {
        this.renderer.setStyle(tr, 'background-color', '#ffffff');
      }
      this.renderer.setStyle(tr, 'border-bottom', '1px solid #e0e0e0');
    });
  }
}
