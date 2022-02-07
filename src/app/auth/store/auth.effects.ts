import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './../auth.service';
import { AppService } from '../../app.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from 'src/app/models/auth.interface';
import { MessageType } from 'src/app/models/message-type.enum';


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
            this.setSessionStorageData(response)
            return AuthActions.authSuccess(
              {
                accessToken: response.jwtToken,
                username: action.username
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

  authSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.authSuccess),
    switchMap(action => {
      return this.authService.getUser(action.username)
        .pipe(
          map(response => {
            sessionStorage.setItem('userRole', response.role);
            sessionStorage.setItem('fullName', response.fullName);
            sessionStorage.setItem('username', response.username);

            this.appService.openSnackBar("Successfully logged in!", MessageType.Success);

            return AuthActions.getUserSuccess(
              {
                user: response,
                userRole: response.role,
                fullName: response.fullName,
                username: response.username
              }
            )
          })
        );
      })
    )
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
      tap(() => this.router.navigate(['/home'])),
      map(() => {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('fullName');
        sessionStorage.removeItem('username');

        return AuthActions.logoutSuccess();
      }),
    )
  );

  authRegister$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.register),
    switchMap(action => {
      const username = action.username;
      const password = action.password;
      return this.authService.register(
        action.email,
        action.password,
        action.fullName,
        action.role,
        action.username)
        .pipe(
          map(authData => {
            return AuthActions.login({username: username, password: password})
          }),
          catchError((errorRes: HttpErrorResponse) => {
            return of(AuthActions.authFail(
              { errorMessage: errorRes.error ? (errorRes.error.errors ? errorRes.error.errors.Email : errorRes.error.Messages[0]) : 'Invalid email and/or password' }
            ));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private appService: AppService,
    private router: Router
  ){}

  private setSessionStorageData(authData: Auth) {
    sessionStorage.setItem('access_token', authData.jwtToken);
  }
}
