import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _employeesReducer = createReducer(
  initialState,

);

export function employeesReducer(state: State, action: Action) {
  return _employeesReducer(state, action);
}
