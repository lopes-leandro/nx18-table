import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SimulatePriceModel, SimulateQuotesService } from '@domain/simulate-quotes';
import { TableCellDirective, TableColumn, TableComponent, TableStyleDirective, TableStyleType } from '@shared/components/ui';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'sgc-insurance-list',
  standalone: true,
  imports: [TableComponent, TableCellDirective, TableStyleDirective, CurrencyPipe],
  templateUrl: './insurance-list.component.html',
  styleUrl: './insurance-list.component.scss'
})
export class InsuranceListComponent implements OnInit {

  loading = false;
  error = false;
  actionLoading: { [key: string]: boolean } = {};
  insurancePrices: SimulatePriceModel[] = [];
  insuranceStyle: TableStyleType = "insurance";
  insuranceColumns: TableColumn<SimulatePriceModel>[] = [];
  readonly insuranceTitle = 'Casa habitual de alvenaria';
  readonly insuranceTitleApartment = 'Apartamento habitual';
  private insurancePriceService = inject(SimulateQuotesService);

  ngOnInit(): void {
    this.insuranceColumns = this.loadColumns();
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.error = false;

    this.insurancePriceService.getSimulateQuotesInsurance().pipe(
      tap((data) => (this.insurancePrices = data)),
      catchError((err) => {
        this.error = true;
        return of([]);
      }),
      finalize(() => (this.loading = false))
    ).subscribe();
  }

  private loadColumns(): TableColumn<SimulatePriceModel>[] {
    return [
      {
        field: 'region',
        header: 'Região',
        width: '40%',
        align: 'left'
      },
      {
        field: 'premiumRate',
        header: 'Prêmio Tarifa',
        width: '20%',
        align: 'center',
        cellTemplate: 'currencyCell'
      },
      {
        field: 'iofTax',
        header: 'IOF',
        width: '20%',
        align: 'center',
        cellTemplate: 'currencyCell'
      },
      {
        field: 'totalPremiumRate',
        header: 'Prêmio Total (Item)',
        width: '20%',
        align: 'center',
        cellTemplate: 'currencyCell'
      }
    ]
  }
}
