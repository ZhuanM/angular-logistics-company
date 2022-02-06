import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { employees } from './store/employees.selectors';
import { appLoading } from '../loader/store/loader.actions';
import { createEmployee, deleteEmployee, getAllEmployees, updateEmployee } from './store/employees.actions';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class EmployeesComponent extends BaseComponent {
  readonly employees$: Observable<any> = this.store.pipe(select(employees), takeUntil(this.destroyed$));
  public employees: any;
  
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
      this.employees = JSON.parse(JSON.stringify(employees));
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllEmployees());
  }

  public ngOnInit(): void {
    this.data = orderDataSource;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
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
       // TODO TEST IF LOADER IS NEEDED
       if (args.action == "edit" && args.requestType == "save") {
        // UPDATE
        let data = args.data;
        // this.store.dispatch(appLoading({ loading: true }));
        this.store.dispatch(updateEmployee({ employee: data }));
      } else if (args.requestType == "delete") {
        // DELETE
        let employeeUsername = args.data[0].username;
        // this.store.dispatch(appLoading({ loading: true }));
        this.store.dispatch(deleteEmployee({ employeeUsername: employeeUsername }));
      } else if (args.action == "add" && args.requestType == "save") {
        // CREATE
        let data = args.data;
        // this.store.dispatch(appLoading({ loading: true }));
        this.store.dispatch(createEmployee({ employee: data }));
      }


    // let gridInstance: any = (<any>document.getElementById('Normalgrid')).ej2_instances[0];
    // if (args.requestType === 'save') {
    //   if (gridInstance.pageSettings.currentPage !== 1 && gridInstance.editSettings.newRowPosition === 'Top') {
    //     args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - gridInstance.pageSettings.pageSize;
    //   } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
    //     args.index = (gridInstance.pageSettings.currentPage * gridInstance.pageSettings.pageSize) - 1;
    //   }
    // }
  }
}
