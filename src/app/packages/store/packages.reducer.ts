import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _packagesReducer = createReducer(
  initialState,

);

export function packagesReducer(state: State, action: Action) {
  return _packagesReducer(state, action);
}
