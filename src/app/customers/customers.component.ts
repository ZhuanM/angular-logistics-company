import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';
import { createCustomer, deleteCustomer, getAllCustomers, updateCustomer } from './store/customers.actions';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { customers } from './store/customers.selectors';
import { appLoading } from '../loader/store/loader.actions';
import { userRole } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class CustomersComponent extends BaseComponent {
  readonly customers$: Observable<any> = this.store.pipe(select(customers), takeUntil(this.destroyed$));
  public customers: any;

  readonly userRole$: Observable<string> = this.store.pipe(select(userRole), takeUntil(this.destroyed$));
  private userRole: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public usernameRules: Object;
  public emailRules: Object;
  public fullNameRules: Object;
  public passwordRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>) {
    super();

    this.customers$.pipe(takeUntil(this.destroyed$)).subscribe(customers => {
      if (customers) {
        this.customers = JSON.parse(JSON.stringify(customers));
      }
    });

    this.userRole$.pipe(takeUntil(this.destroyed$)).subscribe(userRole => {
      this.userRole = sessionStorage.getItem('userRole');
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllCustomers());
  }

  public ngOnInit(): void {
    this.data = orderDataSource;

    if (this.userRole == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.usernameRules = { required: true };
    this.passwordRules = { required: true };
    this.emailRules = { required: true };
    this.fullNameRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    // TODO TEST IF LOADER IS NEEDED
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      // this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateCustomer({ customer: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let customerUsername = args.data[0].username;
      // this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteCustomer({ customerUsername: customerUsername }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      // this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createCustomer({ customer: data }));
    }
  }
}
