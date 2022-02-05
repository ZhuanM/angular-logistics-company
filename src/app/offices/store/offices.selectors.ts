import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./offices.reducer";

const officesSelector = createFeatureSelector<AppState, State>('offices');

export const offices = createSelector(
    officesSelector,
    (state: State) => state.offices
);