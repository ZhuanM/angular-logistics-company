import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { EditService, ToolbarService, PageService, SortService, FilterService } from '@syncfusion/ej2-angular-grids';
import { orderDataSource } from './data';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.scss'],
  providers: [ToolbarService, EditService, PageService, SortService, FilterService]
})
export class OfficesComponent extends BaseComponent {
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
  }

  public ngOnInit(): void {
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
