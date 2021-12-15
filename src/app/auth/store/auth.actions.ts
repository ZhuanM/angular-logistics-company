import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth Component] Login',
  props<{
    username: string,
    password: string
  }>()
);

export const register = createAction(
  '[Auth Component] Register',
  props<{
    email: string,
    password: string
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    city: string,
    postCode: string,
    trial: boolean,
    termsAndConditions: boolean,
    privacyPolicy: boolean
  }>()
);

export const authSuccess = createAction(
  '[Auth Component] Auth Success',
  props<{
    accessToken: string,
    refreshToken: string
  }>()
);

export const authFail = createAction(
  '[Auth Component] Auth Fail',
  props<{
    errorMessage: string
  }>()
);

export const logout = createAction(
  '[Auth Component] Logout'
);

export const logoutSuccess = createAction(
  '[Auth Component] Logout Success'
);

export const resetErrorState = createAction(
  '[Auth Component] Reset Error State'
);

export const refreshToken = createAction(
  '[Auth Component] Refresh Token'
);

export const refreshTokenSuccess = createAction(
  '[Auth Component] Refresh Token Success',
  props<{
    accessToken: string,
    refreshToken: string
  }>()
);

export const refreshTokenFail = createAction(
  '[Auth Component] Refresh Token Success',
  props<{
    errorMessage: string
  }>()
);

export const resetRefreshToken = createAction(
  '[Auth Component] Reset Refresh Token'
);