import { createReducer, on, Action } from '@ngrx/store';
import * as EmployeesActions from './employees.actions';

export interface State {
  employees: any
}

export const initialState: State = {
  employees: null
}

const _employeesReducer = createReducer(
  initialState,

  on(
    EmployeesActions.getAllEmployeesSuccess,
    (state, action) => ({
      ...state,
      employees: action.employees
    })
  ),
);

export function employeesReducer(state: State, action: Action) {
  return _employeesReducer(state, action);
}
