import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./employees.reducer";

const employeesSelector = createFeatureSelector<AppState, State>('employees');

