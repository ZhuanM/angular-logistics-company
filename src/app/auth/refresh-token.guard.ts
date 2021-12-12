import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { refreshToken } from './store/auth.actions';
@Injectable({
    providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {
    constructor(
        private store: Store
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.store.dispatch(refreshToken());
        
        return true;
    }
}
