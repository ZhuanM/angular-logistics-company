import { createReducer, on, Action } from '@ngrx/store';
import * as PackagesActions from './packages.actions';

export interface State {
  packages: any
}

export const initialState: State = {
  packages: null
}

const _packagesReducer = createReducer(
  initialState,

  on(
    PackagesActions.getAllPackagesSuccess,
    (state, action) => ({
      ...state,
      packages: action.packages
    })
  ),
);

export function packagesReducer(state: State, action: Action) {
  return _packagesReducer(state, action);
}
