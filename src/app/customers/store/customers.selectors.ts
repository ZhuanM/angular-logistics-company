import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./customers.reducer";

const customersSelector = createFeatureSelector<AppState, State>('customers');

export const customers = createSelector(
    customersSelector,
    (state: State) => state.customers
);