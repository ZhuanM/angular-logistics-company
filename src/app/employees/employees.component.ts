import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [ToolbarService, EditService, PageService]
})
export class EmployeesComponent extends BaseComponent {
  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public orderIDRules: Object;
  public customerIDRules: Object;
  public freightRules: Object;
  public editParams: Object;
  public pageSettings: Object;
  public formatOptions: Object;

  constructor(private store: Store<AppState>) { 
    super();
  }

  public ngOnInit(): void {
    this.data = orderDataSource;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, newRowPosition: 'Top' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.orderIDRules = { required: true, number: true };
    this.customerIDRules = { required: true };
    this.freightRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
    this.formatOptions = { type: 'dateTime', format: 'd/M/y hh:mm a' }
  }

  actionBegin(args: any): void {
    console.log(args)
    
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
