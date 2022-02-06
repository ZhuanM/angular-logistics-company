import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends BaseComponent {
  public companyName: string = "Test";

  public profitForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  
  constructor(private store: Store<AppState>) { 
    super()
  }

  public onProfitSubmit() {
    if (this.profitForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(AuthActions.login(
      //   {
      //     username: this.profitForm.get('username').value,
      //     password: this.profitForm.get('password').value
      //   }
      // ));
    }
  }
}
