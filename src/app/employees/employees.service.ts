import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrls } from '../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllEmployees() {
    return this.http.get<any>(
      apiUrls.getAllEmployeesUrl
    )
  }

  createEmployee(employee: any) {
    return this.http.post<any>(
      apiUrls.registerUrl,
      {
        "email": employee.email,
        "fullName": employee.fullName,
        "password": employee.password,
        "username": employee.username,
        "role": employee.role
      }
    )
  }

  updateEmployee(employee: any) {
    return this.http.post<any>(
      apiUrls.updateUserUrl,
      {
        "email": employee.email,
        "fullName": employee.fullName,
        "password": employee.password,
        "username": employee.username,
        "role": employee.role
      }
    )
  }

  deleteEmployee(employee: any) {
    let httpParams = new HttpParams().set('username', employee);
    let options = { params: httpParams };

    return this.http.delete<any>(
      apiUrls.deleteUserUrl,
      options
    )
  }
}
