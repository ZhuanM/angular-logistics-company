import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { userRole } from './store/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  private subscription = new Subscription();
  readonly userRole$: Observable<string> = this.store.pipe(select(userRole));

  public userRole: string;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.subscription.add(this.userRole$.subscribe(userRole => {
      if (userRole) {
        this.userRole = userRole;
      }
    }));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userRole == "ADMIN") {
      return true
    }

    return this.router.navigate(['./login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
