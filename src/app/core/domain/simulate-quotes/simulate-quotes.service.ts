import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SimulatePriceApi } from './simulate-price.api';
import { catchError, map, Observable, of } from 'rxjs';
import { SimulatePriceModel } from './simulate-price.model';

@Injectable({
  providedIn: 'root'
})
export class SimulateQuotesService {

  private apiUrl = {
    assets: 'assets/data/simulate-quotes.json',
  }

  private http = inject(HttpClient);

  getSimulateQuotesInsurance(): Observable<SimulatePriceModel[]> {
    return this.http.get<SimulatePriceApi[]>(this.apiUrl.assets).pipe(
      map((arr) => arr.map(this.fromToApi)),
      catchError((error) => {
        console.error("Error fetching insurance quote", error);
        return of([])
      })
    )
  }

  private fromToApi(dto: SimulatePriceApi): SimulatePriceModel {
    return {
      ...dto,
      iofTax: dto.iof_tax,
      premiumRate: dto.premium_rate,
      totalPremiumRate: dto.total_premium_rate
    }
  }
}
