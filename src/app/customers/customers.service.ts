import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllCustomers() {
    return this.http.get<any>(
      apiUrls.getAllCustomersUrl
    )
  }

  createCustomer(customer: any) {
    return this.http.post<any>(
      apiUrls.registerUrl,
      {
        "email": customer.email,
        "fullName": customer.fullName,
        "password": customer.password,
        "username": customer.username,
        "role": "USER"
      }
    )
  }

  updateCustomer(customer: any) {
    return this.http.post<any>(
      apiUrls.updateUserUrl,
      {
        "email": customer.email,
        "fullName": customer.fullName,
        "password": customer.password,
        "username": customer.username,
        "role": "USER"
      }
    )
  }

  deleteCustomer(customerUsername: any) {
    let httpParams = new HttpParams().set('username', customerUsername);
    let options = { params: httpParams };

    return this.http.delete<any>(
      apiUrls.deleteUserUrl,
      options
    )
  }
}
