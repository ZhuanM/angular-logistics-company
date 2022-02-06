import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./packages.reducer";

const packagesSelector = createFeatureSelector<AppState, State>('packages');

export const packages = createSelector(
    packagesSelector,
    (state: State) => state.packages
);