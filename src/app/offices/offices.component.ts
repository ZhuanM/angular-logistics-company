import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { offices } from './store/offices.selectors';
import { createOffice, deleteOffice, getAllOffices, updateOffice } from './store/offices.actions';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class OfficesComponent extends BaseComponent {
  readonly offices$: Observable<any> = this.store.pipe(select(offices), takeUntil(this.destroyed$));
  public offices: any;

  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public idRules: Object;
  public nameRules: Object;
  public addressRules: Object;
  public editParams: Object;
  public pageSettings: Object;

  constructor(private store: Store<AppState>) { 
    super();
    this.offices$.pipe(takeUntil(this.destroyed$)).subscribe(offices => {
      this.offices = JSON.parse(JSON.stringify(offices));
    });

    this.store.dispatch(getAllOffices());
  }

  public ngOnInit(): void {
    // FAKE DATA EXAMPLE
    this.data = orderDataSource;

    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.idRules = { required: true, number: true };
    this.nameRules = { required: true };
    this.addressRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
  }

  actionBegin(args: any): void {
    console.log(args)
    if (args.action == "edit" && args.requestType == "save") {
      let data = args.data;
      this.store.dispatch(updateOffice({ office: data }));
    } else if (args.requestType == "delete") {
      // DELETE OFFICE
      let officeId = args.data[0].id;
      this.store.dispatch(deleteOffice({ officeId: officeId }));
    } else if (args.action == "add" && args.requestType == "save") {
      // CREATE OFFICE
      let data = args.data;
      this.store.dispatch(createOffice({ office: data }));
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
