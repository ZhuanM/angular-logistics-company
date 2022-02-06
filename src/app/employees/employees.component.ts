import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { employees } from './store/employees.selectors';
import { appLoading } from '../loader/store/loader.actions';
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from './store/employees.actions';
import { userRole } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class EmployeesComponent extends BaseComponent {
  readonly employees$: Observable<any> = this.store.pipe(select(employees), takeUntil(this.destroyed$));
  public employees: any;

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

    this.employees$.pipe(takeUntil(this.destroyed$)).subscribe(employees => {
      if (employees) {
        this.employees = JSON.parse(JSON.stringify(employees));
      }
    });

    this.userRole$.pipe(takeUntil(this.destroyed$)).subscribe(userRole => {
      this.userRole = sessionStorage.getItem('userRole');
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllEmployees());
  }

  public ngOnInit(): void {
    if (this.userRole == "ADMIN") {
      this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    } else {
      this.editSettings = { allowEditing: false, allowAdding: false, allowDeleting: false, newRowPosition: 'Top' };
    }

    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.usernameRules = { required: true };
    this.emailRules = { required: true };
    this.fullNameRules = { required: true };
    this.passwordRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateEmployee({ employee: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let employeeUsername = args.data[0].username;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteEmployee({ employeeUsername: employeeUsername }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createEmployee({ employee: data }));
    }
  }
}
