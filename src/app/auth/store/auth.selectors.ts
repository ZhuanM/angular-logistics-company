import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/app-state.interface';
import { State } from './auth.reducer'

const authFeatureSelector = createFeatureSelector<AppState, State>('auth');

export const authError = createSelector(
  authFeatureSelector,
  (state: State) => state.authError
);

export const isLoading = createSelector(
  authFeatureSelector,
  (state: State) => state.isLoading
);

export const userRole = createSelector(
  authFeatureSelector,
  (state: State) => state.userRole
);

export const fullName = createSelector(
  authFeatureSelector,
  (state: State) => state.fullName
);

export const user = createSelector(
  authFeatureSelector,
  (state: State) => state.user
);

export const username = createSelector(
  authFeatureSelector,
  (state: State) => state.username
);

