import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.interface';

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
    password: string,
    fullName: string,
    role: string,
    username: string
  }>()
);

export const authSuccess = createAction(
  '[Auth Component] Auth Success',
  props<{
    accessToken: string,
    username: string
  }>()
);

export const authFail = createAction(
  '[Auth Component] Auth Fail',
  props<{
    errorMessage: string
  }>()
);

export const getUser = createAction(
  '[Auth Component] Get User',
  props<{
    username: string
  }>()
);

export const getUserSuccess = createAction(
  '[Auth Component] Get User Success',
  props<{
    user: User,
    userRole: string,
    fullName: string,
    username: string
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
