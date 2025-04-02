import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PolicyModel } from './policy.model';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl = {
    policies: 'api/policies'
  };

  private http = inject(HttpClient);

  getPolicies(): Observable<PolicyModel[]> {
    return of(this.getMockPolicies()).pipe(
      map((policies) => policies.map((policy) => ({
        ...policy,
        startDate: new Date(policy.startDate),
        endDate: new Date(policy.endDate)
      }))),
      catchError((error) => {
        console.error('Error fetching policies', error);
        console.log(error);        
        return of(this.getMockPolicies()).pipe(
          map((policies) => policies.map((policy) => ({
            ...policy,
            startDate: new Date(policy.startDate),
            endDate: new Date(policy.endDate)
          })))
        )
      })
    )
  }

  includeItem(policy: PolicyModel): Observable<PolicyModel | { success: boolean }> {
    return of({ success: true })
  }

  private getMockPolicies(): PolicyModel[] {
    return [
      {
        id: "1",
        policyNumber: "AP1234567890R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
      {
        id: "2",
        policyNumber: "AP9876543218R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
      {
        id: "3",
        policyNumber: "AP2468135798R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
      {
        id: "4",
        policyNumber: "AP1357924680R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
      {
        id: "5",
        policyNumber: "AP1415926530R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
      {
        id: "6",
        policyNumber: "AP1029384750R",
        holderName: "Nome e Sobrenome do Estipulante",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2026-01-01"),
      },
    ]
  }
}
