import { Component } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { Observable, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { offices } from './store/offices.selectors';
import { createOffice, deleteOffice, getAllOffices, updateOffice } from './store/offices.actions';
import { appLoading } from '../loader/store/loader.actions';
import { userRole } from '../auth/store/auth.selectors';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class OfficesComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly offices$: Observable<any> = this.store.pipe(select(offices), takeUntil(this.destroyed$));
  public offices: any;

  readonly userRole$: Observable<string> = this.store.pipe(select(userRole), takeUntil(this.destroyed$));
  private userRole: string;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public nameRules: Object;
  public addressRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>,
    private actionsSubject$: ActionsSubject) { 
    super();
    this.offices$.pipe(takeUntil(this.destroyed$)).subscribe(offices => {
      if (offices) {
        this.offices = JSON.parse(JSON.stringify(offices));
      }
    });

    this.userRole$.pipe(takeUntil(this.destroyed$)).subscribe(userRole => {
      this.userRole = sessionStorage.getItem('userRole');
    });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[Offices Component] Create Office Success'))
    .subscribe(() => {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getAllOffices());
    }));

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllOffices());
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
    this.addressRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    if (args.action == "edit" && args.requestType == "save") {
      // UPDATE
      debugger
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(updateOffice({ office: data }));
    } else if (args.requestType == "delete") {
      // DELETE
      let officeId = args.data[0].id;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(deleteOffice({ officeId: officeId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE
      let data = args.data;
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(createOffice({ office: data }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
