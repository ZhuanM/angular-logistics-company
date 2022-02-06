import { createReducer, on, Action } from '@ngrx/store';
import * as CustomersActions from './customers.actions';

export interface State {
  customers: any
}

export const initialState: State = {
  customers: null
}

const _customersReducer = createReducer(
  initialState,

  on(
    CustomersActions.getAllCustomersSuccess,
    (state, action) => ({
      ...state,
      customers: action.customers
    })
  ),
);

export function customersReducer(state: State, action: Action) {
  return _customersReducer(state, action);
}
