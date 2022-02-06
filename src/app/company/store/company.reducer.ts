import { createReducer, on, Action } from '@ngrx/store';
import * as CompanyActions from './company.actions';

export interface State {
  companyName: string,
  companyProfit: any
}

export const initialState: State = {
  companyName: null,
  companyProfit: null
}

const _companyReducer = createReducer(
  initialState,

  on(
    CompanyActions.getCompanyNameSuccess,
    (state, action) => ({
      ...state,
      companyName: action.name
    })
  ),

  on(
    CompanyActions.getCompanyProfitSuccess,
    (state, action) => ({
      ...state,
      companyProfit: action.profit
    })
  ),
);

export function companyReducer(state: State, action: Action) {
  return _companyReducer(state, action);
}
