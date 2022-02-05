import { createReducer, on, Action } from '@ngrx/store';
import * as OfficesActions from './offices.actions';

export interface State {
  offices: any,
}

export const initialState: State = {
  offices: null
}

const _officesReducer = createReducer(
  initialState,

  on(
    OfficesActions.getAllOfficesSuccess,
    (state, action) => ({
      ...state,
      offices: action.offices
    })
  ),
);

export function officesReducer(state: State, action: Action) {
  return _officesReducer(state, action);
}
