import { environment } from 'src/environments/environment';

export const apiUrls = {
  loginUrl: environment.apiBaseUrl + 'authenticate',
  registerUrl: environment.apiBaseUrl + 'api/users/register',
  getUserUrl: environment.apiBaseUrl + 'api/users/user',
}
