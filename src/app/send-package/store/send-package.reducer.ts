import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _sendPackageReducer = createReducer(
  initialState,

);

export function sendPackageReducer(state: State, action: Action) {
  return _sendPackageReducer(state, action);
}
