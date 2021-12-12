import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from './../shared/api-urls';
import { getAccessToken, getRefreshToken } from '../shared/utility';


@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient
  ) {}

  authHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  login(email: string, password: string) {
    // TODO
    return this.http.post<any>(
      apiUrls.loginUrl,
      {
        "Email": email,
        "Password": password
      },
      { headers: this.authHeaders }
    )
  }

  refreshToken() {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    // TODO
    return this.http.post<any>(
      apiUrls.refreshTokenUrl,
      {
        "AccessToken": accessToken,
        "RefreshToken": refreshToken
      }
    )
  }
}
