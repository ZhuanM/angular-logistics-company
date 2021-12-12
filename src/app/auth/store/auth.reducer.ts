import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  accessToken: string;
  refreshToken: string;
  authError: string;
  isLoading: boolean;
  tokenRefreshed: boolean;
}

export const initialState: State = {
  accessToken: null,
  refreshToken: null,
  authError: null,
  isLoading: false,
  tokenRefreshed: false
}

const _authReducer = createReducer(

  initialState,

  on(
    AuthActions.login,
    (state) => ({
      ...state,
      authError: null,
      isLoading: true
    })
  ),

  on(
    AuthActions.refreshTokenSuccess,
    (state, action) => ({
      ...state,
      authError: null,
      isLoading: false,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      tokenRefreshed: true
    })
  ),

  on(
    AuthActions.resetRefreshToken,
    (state) => ({
      ...state,
      tokenRefreshed: false
    })
  ),

  on(
    AuthActions.authSuccess,
    (state, action) => ({
      ...state,
      authError: null,
      isLoading: false,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken
    })
  ),

  on(
    AuthActions.authFail,
    (state, action) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      authError: action.errorMessage,
      isLoading: false,
    })
  ),

  on(
    AuthActions.logoutSuccess,
    (state) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      authError: null,
      isLoading: false
    })
  ),

  on(
    AuthActions.resetErrorState,
    (state) => ({
      ...state,
      authError: null
    })
  )
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
