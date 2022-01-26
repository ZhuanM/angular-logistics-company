import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-send-package',
  templateUrl: './send-package.component.html',
  styleUrls: ['./send-package.component.scss']
})
export class SendPackageComponent extends BaseComponent {
  constructor(private store: Store<AppState>) { 
    super()
  }
}
