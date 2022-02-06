import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class PackagesComponent extends BaseComponent {
  public data: Object[];
  public editSettings: Object;
  public toolbar: string[];

  public idRules: Object;
  public nameRules: Object;
  public senderRules: Object;
  public recipientRules: Object;
  public sentDateRules: Object;
  public expectedDeliveryRules: Object;
  public statusRules: Object;
  public deliveryAddressRules: Object;
  public priceRules: Object;
  public weightRules: Object;
  public registeredByRules: Object;
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
    this.idRules = { required: true, number: true };
    this.nameRules = { required: true };
    this.senderRules = { required: true };
    this.recipientRules = { required: true };
    this.sentDateRules = { required: true };
    this.expectedDeliveryRules = { required: true };
    this.statusRules = { required: true };
    this.deliveryAddressRules = { required: true };
    this.priceRules = { required: true, number: true };
    this.weightRules = { required: true, number: true };
    this.registeredByRules = { required: true };
    this.editParams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 10 };
    this.formatOptions = { type: 'dateTime', format: 'd/M/y hh:mm a' };
  }

  actionBegin(args: any): void {
    
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
