import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { first, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseComponent } from './shared/base.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as HeaderActions from './header/store/header.actions';
import * as HeaderSelectors from './header/store/header.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  // SIDENAV
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  readonly sidenavOpened$: Observable<boolean> = this.store.pipe(select(HeaderSelectors.sidenavOpened), takeUntil(this.destroyed$));

  public sideNavItems: Array<any>;

  private homeURL: boolean = false;
  private loginURL: boolean = false;
  private registerURL: boolean = false;

  constructor(
    private observer: BreakpointObserver,
    private store: Store,
    private router: Router,
    private location: Location
  ) {
    super();

    this.updateSidenavItems();
  }

  // THIS FUNCTION EXISTS BECAUSE this.location.path() doesn't return correct url when logging in and doesn't update accordingly the header and sidenav
  public toHome() {
    this.homeURL = true;
    this.loginURL = false;
    this.registerURL = false;

    this.sideNavItems = [
      {
        icon: "home",
        text: "Home",
        clicked: this.homeURL
      },
      {
        icon: "login",
        text: "Login",
        clicked: this.loginURL
      },
      {
        icon: "account_circle",
        text: "Register",
        clicked: this.registerURL
      },
    ];
  }

  public updateSidenavItems() {
    if (this.location.path() == "/home") {
      this.homeURL = true;
      this.loginURL = false;
      this.registerURL = false;
    } else if (this.location.path() == "/login") {
      this.loginURL = true;
      this.homeURL = false;
      this.registerURL = false;
    } else if (this.location.path() == "/register") {
      this.registerURL = true;
      this.homeURL = false;
      this.loginURL = false;
    }

    this.sideNavItems = [
      {
        icon: "home",
        text: "Home",
        clicked: this.homeURL
      },
      {
        icon: "login",
        text: "Login",
        clicked: this.loginURL
      },
      {
        icon: "account_circle",
        text: "Register",
        clicked: this.registerURL
      },
    ];
  }

  public itemClicked(index: number) {
    for (let item of this.sideNavItems) {
      if (item.clicked) {
        item.clicked = false
      }
    }

    this.sideNavItems[index].clicked = true;

    switch (this.sideNavItems[index].text) {
      case "Home":
        if (this.location.path() == "/home") {
          window.location.reload();
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        } else {
          this.router.navigate(['home']);
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        }
        break;
      case "Login":
        if (this.location.path() == "/login") {
          window.location.reload();
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        } else {
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        }
        break;
      case "Register":
        if (this.location.path() == "/register") {
          window.location.reload();
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        } else {
          this.router.navigate(['register']);
          if (this.sidenav.mode == 'over') {
            this.closeSidenav();
          }
        }
        break;
    }
  }

  ngAfterViewInit() {
    this.sidenavObserve();
  }

  // SIDENAV FUNCTIONS
  private openSidenav() {
    this.store.dispatch(HeaderActions.showSidenav());
  }

  private closeSidenav() {
    this.store.dispatch(HeaderActions.hideSidenav());
  }

  public toggleSidenav() {
    this.sidenavOpened$.pipe(first()).subscribe(open => {
      if (open) {
        return this.closeSidenav();
      }

      this.openSidenav();
    });
  }

  private sidenavObserve() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (this.sidenav) {
        // THE TIMEOUT FIXES "ExpressionChangedAfterItHasBeenCheckedError"
        setTimeout(() => {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.closeSidenav();
          } else {
            this.sidenav.mode = 'side';
            this.openSidenav();
          }
        });
      }
    });
  }
}
