import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { Observable, Subscription } from 'rxjs';
import { packages } from './store/packages.selectors';
import { filter, takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { createPackage, deletePackage, getAllPackages, getUserPackages, updatePackage } from './store/packages.actions';
import { username, userRole } from '../auth/store/auth.selectors';
import { AppService } from '../app.service';
import { MessageType } from '../models/message-type.enum';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class PackagesComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly packages$: Observable<any> = this.store.pipe(select(packages), takeUntil(this.destroyed$));
  public packages: any;

  readonly userRole$: Observable<string> = this.store.pipe(select(userRole), takeUntil(this.destroyed$));
  public userRole: string;

  readonly username$: Observable<string> = this.store.pipe(select(username), takeUntil(this.destroyed$));
  public username: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];

  public idRules: Object;
  public nameRules: Object;
  public senderRules: Object;
  public recipientRules: Object;
  public companyRules: Object;
  public sentDateRules: Object;
  public expectedDeliveryRules: Object;
  public statusRules: Object;
  public deliveryAddressRules: Object;
  public priceRules: Object;
  public weightRules: Object;
  public registeredByRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject,
    private appService: AppService) {
    super();

    this.packages$.pipe(takeUntil(this.destroyed$)).subscribe(packages => {
      if (packages) {
        this.packages = JSON.parse(JSON.stringify(packages));
      }
    });

    this.userRole$.pipe(takeUntil(this.destroyed$)).subscribe(userRole => {
      this.userRole = sessionStorage.getItem('userRole');
    });

    this.username$.pipe(takeUntil(this.destroyed$)).subscribe(username => {
      this.username = sessionStorage.getItem('username');
    });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Packages Component] Create Package Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully added new package!", MessageType.Success);

      this.store.dispatch(appLoading({ loading: true }));
      if (this.userRole == "USER") {
        this.store.dispatch(getUserPackages({ username: this.username }));
      } else if (this.userRole == "ADMIN" || this.userRole == "COURIER") {
        this.store.dispatch(getAllPackages());
      }
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Packages Component] Update Package Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully updated package!", MessageType.Success);
    }));

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Packages Component] Delete Package Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully deleted package!", MessageType.Success);
    }));

    this.store.dispatch(appLoading({ loading: true }));
    if (this.userRole == "USER") {
      this.store.dispatch(getUserPackages({ username: this.username }));
    } else if (this.userRole == "ADMIN" || this.userRole == "COURIER") {
      this.store.dispatch(getAllPackages());
    }
  }

  public ngOnInit(): void {
    if (this.userRole == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.nameRules = { required: true };
    this.senderRules = { required: true };
    this.recipientRules = { required: true };
    this.companyRules = { required: true };
    this.sentDateRules = { required: true };
    this.expectedDeliveryRules = { required: true };
    this.statusRules = { required: true };
    this.deliveryAddressRules = { required: true };
    this.priceRules = { required: true, number: true };
    this.weightRules = { required: true, number: true };
    this.registeredByRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updatePackage({ package: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let packageId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deletePackage({ packageId: packageId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createPackage({ package: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
