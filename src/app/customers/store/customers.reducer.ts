import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _customersReducer = createReducer(
  initialState,

);

export function customersReducer(state: State, action: Action) {
  return _customersReducer(state, action);
}
