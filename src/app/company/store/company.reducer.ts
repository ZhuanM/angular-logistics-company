import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _companyReducer = createReducer(
  initialState,

);

export function companyReducer(state: State, action: Action) {
  return _companyReducer(state, action);
}
