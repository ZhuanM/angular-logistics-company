import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface State {
  accessToken: string;
  authError: string;
  isLoading: boolean;
}

export const initialState: State = {
  accessToken: null,
  authError: null,
  isLoading: false,
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
    AuthActions.authSuccess,
    (state, action) => ({
      ...state,
      authError: null,
      isLoading: false,
      accessToken: action.accessToken,
    })
  ),

  on(
    AuthActions.authFail,
    (state, action) => ({
      ...state,
      accessToken: null,
      authError: action.errorMessage,
      isLoading: false,
    })
  ),

  on(
    AuthActions.logoutSuccess,
    (state) => ({
      ...state,
      accessToken: null,
      authError: null,
      isLoading: false
    })
  ),
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
