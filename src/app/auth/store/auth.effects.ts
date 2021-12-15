import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './../auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.interface';


@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.login),
    switchMap(action => {
      return this.authService.login(action.username, action.password)
        .pipe(
          tap(() => this.router.navigate(['/home'])),
          map(response => {
            this.setLocalStorageData(response.Data)
            return AuthActions.authSuccess(
              {
                accessToken: response.Data.AccessToken,
                refreshToken: response.Data.RefreshToken
              }
            )
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.authFail(
              { errorMessage: errorRes.error ? (errorRes.error.errors ? errorRes.error.errors.Username : errorRes.error.Messages[0]) : 'Invalid username and/or password' }
            ));
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/login'])),
      map(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expiry_date');

        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
        sessionStorage.removeItem('expiry_date');

        return AuthActions.logoutSuccess();
      }),
    )
  );

  refreshToken$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.refreshToken),
    switchMap(() => {
      return this.authService.refreshToken()
        .pipe(
          map(response => {
            this.setLocalStorageData(response.Data)
            return AuthActions.refreshTokenSuccess(
              {
                accessToken: response.Data.AccessToken,
                refreshToken: response.Data.RefreshToken
              }
            )
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.refreshTokenFail(
              { errorMessage: errorRes.error }
            ));
          })
        );
      })
    )
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ){}

  private setLocalStorageData(authData: Auth) {
    const today = new Date();

    sessionStorage.setItem('access_token', authData.AccessToken);
    sessionStorage.setItem('refresh_token', authData.RefreshToken);
    sessionStorage.setItem('expiry_date', today.setDate(today.getDate() + 1).toString());
  }
}
