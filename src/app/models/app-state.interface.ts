import * as fromAuth from '../auth/store/auth.reducer';
import * as fromLoader from '../loader/store/loader.reducer';
import * as fromHeader from '../header/store/header.reducer';
import * as fromHome from '../home/store/home.reducer';

// TODO
export interface AppState {
    auth: fromAuth.State,
    loader: fromLoader.State
    header: fromHeader.State,
    home: fromHome.State,
};