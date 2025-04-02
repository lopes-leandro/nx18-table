import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PolicyModel, PolicyService } from '@domain/policies';
import { ButtonComponent, TableCellDirective, TableColumn, TableComponent, ToastService } from '@shared/components/ui';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'sgc-policy-list',
  standalone: true,
  imports: [TableComponent, TableCellDirective, DatePipe, ButtonComponent],
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss'
})
export class PolicyListComponent implements OnInit {
  policies: PolicyModel[] = [];
  loading = false;
  error = false;
  actionLoading: { [key: string]: boolean } = {};
  private policyService = inject(PolicyService);
  private toastService = inject(ToastService);

  columns: TableColumn<PolicyModel>[] = [
    {
      field: 'policyNumber',
      header: 'Apólice mãe',
    },
    {
      field: 'holderName',
      header: 'Nome do estipulante',
    },
    {
      field: 'startDate',
      header: 'Inicio da vigência',
      cellTemplate: 'dateCell'
    },
    {
      field: 'endDate',
      header: 'Fim da vigência',
      cellTemplate: 'dateCell'
    },
  ]
  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.loading = true;
    this.error = false;
    this.policyService.getPolicies()
      .pipe(
        tap((data) => (this.policies = data)),
        catchError((err) => {
          this.error = true;
          return of([])
        }),
        finalize(() => (this.loading = false)),
      )
      .subscribe();
  }

  handleIncludeItem(policy: PolicyModel): void {
    this.actionLoading[policy.id] = true;

    this.policyService.includeItem(policy)
      .pipe(
        finalize(() => {
          this.actionLoading[policy.id] = false
        })
      )
      .subscribe({
        next: () => {    
          this.toastService.show({
            message: `Item incluido com sucesso para a apólice ${policy.policyNumber}`,
            type: 'success'
          })
        },
        error: () => {
          this.toastService.show({
            message: 'Erro ao incluir item. Tente novamente.',
            type: 'error'
          })
        }
      });
  }
}
