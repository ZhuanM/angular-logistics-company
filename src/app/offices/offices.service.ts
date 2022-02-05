import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class OfficesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllOffices() {
    return this.http.get<any>(
      apiUrls.getAllOfficesUrl
    )
  }

  createOffice(office: any) {
    return this.http.post<any>(
      apiUrls.createOfficeUrl,
      {
        "id": office.id,
        "name": office.name,
        "address": office.address,
      }
    )
  }

  updateOffice(office: any) {
    return this.http.post<any>(
      apiUrls.updateOfficeUrl,
      {
        "name": office.name,
        "address": office.address,
        "company": {
          "id": office.company.id,
          "name": office.company.name
        }
      }
    )
  }

  deleteOffice(officeId: any) {
    let httpParams = new HttpParams().set('id', '1');
    let options = { params: httpParams };

    return this.http.delete<any>(
      apiUrls.deleteOfficeUrl,
      options
    )
  }
}
