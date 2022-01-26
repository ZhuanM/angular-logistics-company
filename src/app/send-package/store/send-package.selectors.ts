import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./send-package.reducer";

const sendPackageSelector = createFeatureSelector<AppState, State>('sendPackage');

