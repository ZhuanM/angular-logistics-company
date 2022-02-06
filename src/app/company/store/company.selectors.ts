import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./company.reducer";

const companySelector = createFeatureSelector<AppState, State>('company');

export const companyName = createSelector(
    companySelector,
    (state: State) => state.companyName
);

export const companyProfit = createSelector(
    companySelector,
    (state: State) => state.companyProfit
);