import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PolicyModel } from './policy.model';
import { PolicyApi } from './policy.api';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private apiUrl = {
    assets: 'assets/data/policies.json',
  };

  private http = inject(HttpClient);

  getPolicies(): Observable<PolicyModel[]> {
    return this.http.get<PolicyApi[]>(this.apiUrl.assets).pipe(
      map((arr) => arr.map((policy) => this.fromTo(policy))),
      catchError((error) => {
        console.error('Error fetching policies', error);
        return of([])
      })
    )
  }

  includeItem(policy: PolicyModel): Observable<PolicyModel | { success: boolean }> {
    return of({ success: true })
  }

  private fromTo(dto: PolicyApi): PolicyModel {
    return {
      ...dto,
      policyNumber: dto.policy_number,
      holderName: dto.holder_name,
      startDate: new Date(dto.start_date),
      endDate: new Date(dto.end_date),
    }
  }
}
