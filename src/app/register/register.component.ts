import { Component } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {
  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }
}
