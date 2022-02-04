import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { apiUrls } from './../shared/api-urls';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  login(username: string, password: string) {
    return this.http.post<any>(
      apiUrls.loginUrl,
      {
        "username": username,
        "password": password
      },
      { headers: this.authHeaders }
    )
  }

  register(
    email: string,
    password: string,
    fullName: string,
    role: string,
    username: string
    ) {
    return this.http.post<any>(
      apiUrls.registerUrl,
      {
        "email": email,
        "fullName": fullName,
        "password": password,
        "role": role,
        "username": username,
      }
    )
  }

  getUser(username: string) {
    let params = new HttpParams();
    params = params.append('username', username);
    
    return this.http.get<any>(
      apiUrls.getUserUrl,
      {
        params: params
      }
    )
  }
}
