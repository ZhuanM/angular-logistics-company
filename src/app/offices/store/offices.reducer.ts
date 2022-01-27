import { createReducer, on, Action } from '@ngrx/store';

export interface State {
}

export const initialState: State = {
}

const _officesReducer = createReducer(
  initialState,

);

export function officesReducer(state: State, action: Action) {
  return _officesReducer(state, action);
}
