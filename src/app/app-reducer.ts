import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './models/app-state.interface';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromLoader from './loader/store/loader.reducer';
import * as fromHeader from './header/store/header.reducer';
import * as fromHome from './home/store/home.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  loader: fromLoader.loaderReducer,
  header: fromHeader.headerReducer,
  home: fromHome.homeReducer,
};
