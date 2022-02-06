import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';


@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(
    private http: HttpClient,
  ) {}

  getCompanyName() {
    return this.http.get<any>(
      apiUrls.getCompanyName
    )
  }

  getCompanyProfit(startDate: string, endDate: string) {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
    
    return this.http.get<any>(
      apiUrls.getCompanyProfit,
      {
        params: params
      }
    )
  }
}
