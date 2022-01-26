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

  // URLs
  private homeURL: boolean = false;
  private loginURL: boolean = false;
  private registerURL: boolean = false;
  private packagesURL: boolean = false;
  private sendPackageURL: boolean = false;
  private companyURL: boolean = false;
  private employeesURL: boolean = false;
  private customersURL: boolean = false;

  private role: string = "logged office-worker";

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
    if (this.role == "non-logged user") {
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
    } else if (this.role == "logged customer") {
      this.homeURL = true;
      this.packagesURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
      ];
    } else if (this.role == "logged courier") {
      this.homeURL = true;
      this.packagesURL = false;
      this.sendPackageURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
        {
          icon: "ios_share",
          text: "Send Package",
          clicked: this.sendPackageURL
        },
      ];
    } else if (this.role == "logged office-worker") {
      this.homeURL = true;
      this.packagesURL = false;
      this.sendPackageURL = false;
      this.companyURL = false;
      this.employeesURL = false;
      this.customersURL = false;

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
        {
          icon: "ios_share",
          text: "Send Package",
          clicked: this.sendPackageURL
        },
        {
          icon: "business",
          text: "Company",
          clicked: this.companyURL
        },
        {
          icon: "engineering",
          text: "Employees",
          clicked: this.employeesURL
        },
        {
          icon: "group",
          text: "Customers",
          clicked: this.customersURL
        },
      ];
    }
  }

  public updateSidenavItems() {
    if (this.role == "non-logged user") {
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
    } else if (this.role == "logged customer") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.packagesURL = false;
      } else if (this.location.path() == "/packages") {
        this.packagesURL = true;
        this.homeURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
      ];
    } else if (this.role == "logged courier") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.packagesURL = false;
        this.sendPackageURL = false;
      } else if (this.location.path() == "/packages") {
        this.packagesURL = true;
        this.homeURL = false;
        this.sendPackageURL = false;
      } else if (this.location.path() == "/send_package") {
        this.sendPackageURL = true;
        this.homeURL = false;
        this.packagesURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
        {
          icon: "ios_share",
          text: "Send Package",
          clicked: this.sendPackageURL
        },
      ];
    } else if (this.role == "logged office-worker") {
      if (this.location.path() == "/home") {
        this.homeURL = true;
        this.packagesURL = false;
        this.sendPackageURL = false;
        this.companyURL = false;
        this.employeesURL = false;
        this.customersURL = false;
      } else if (this.location.path() == "/packages") {
        this.packagesURL = true;
        this.homeURL = false;
        this.sendPackageURL = false;
        this.companyURL = false;
        this.employeesURL = false;
        this.customersURL = false;
      } else if (this.location.path() == "/send_package") {
        this.sendPackageURL = true;
        this.homeURL = false;
        this.packagesURL = false;
        this.companyURL = false;
        this.employeesURL = false;
        this.customersURL = false;
      } else if (this.location.path() == "/company") {
        this.companyURL = true;
        this.sendPackageURL = false;
        this.homeURL = false;
        this.packagesURL = false;
        this.employeesURL = false;
        this.customersURL = false;
      } else if (this.location.path() == "/employees") {
        this.employeesURL = true;
        this.companyURL = false;
        this.sendPackageURL = false;
        this.homeURL = false;
        this.packagesURL = false;
        this.customersURL = false;
      } else if (this.location.path() == "/customers") {
        this.customersURL = true;
        this.employeesURL = false;
        this.companyURL = false;
        this.sendPackageURL = false;
        this.homeURL = false;
        this.packagesURL = false;
      }

      this.sideNavItems = [
        {
          icon: "home",
          text: "Home",
          clicked: this.homeURL
        },
        {
          icon: "inventory_2",
          text: "Packages",
          clicked: this.packagesURL
        },
        {
          icon: "ios_share",
          text: "Send Package",
          clicked: this.sendPackageURL
        },
        {
          icon: "business",
          text: "Company",
          clicked: this.companyURL
        },
        {
          icon: "engineering",
          text: "Employees",
          clicked: this.employeesURL
        },
        {
          icon: "group",
          text: "Customers",
          clicked: this.customersURL
        },
      ];
    }
  }

  public itemClicked(index: number) {
    for (let item of this.sideNavItems) {
      if (item.clicked) {
        item.clicked = false
      }
    }

    this.sideNavItems[index].clicked = true;

    if (this.role == "non-logged user") {
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
            this.router.navigate(['login']);
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
    } else if (this.role == "logged customer") {
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
        case "Packages":
          if (this.location.path() == "/packages") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['packages']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "logged courier") {
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
        case "Packages":
          if (this.location.path() == "/packages") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['packages']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Send Package":
          if (this.location.path() == "/send_package") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['send_package']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
    } else if (this.role == "logged office-worker") {
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
        case "Packages":
          if (this.location.path() == "/packages") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['packages']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Send Package":
          if (this.location.path() == "/send_package") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['send_package']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Company":
          if (this.location.path() == "/company") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['company']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Employees":
          if (this.location.path() == "/employees") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['employees']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
        case "Customers":
          if (this.location.path() == "/customers") {
            window.location.reload();
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          } else {
            this.router.navigate(['customers']);
            if (this.sidenav.mode == 'over') {
              this.closeSidenav();
            }
          }
          break;
      }
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
