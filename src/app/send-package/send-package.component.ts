import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-send-package',
  templateUrl: './send-package.component.html',
  styleUrls: ['./send-package.component.scss']
})
export class SendPackageComponent extends BaseComponent {
  public sendPackageForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    sender: new FormControl('', [Validators.required]),
    recipient: new FormControl('', [Validators.required]),
    registeredBy: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    recipientAddress: new FormControl('', [Validators.required]),
    sentDate: new FormControl('', [Validators.required]),
    expectedDate: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  public statusOptions: any[] = [
    { value: 'inOffice', viewValue: 'In Office' },
    { value: 'inCourier', viewValue: 'In Courier' },
    { value: 'delivered', viewValue: 'Delivered' },
  ];
  
  constructor(private store: Store<AppState>) { 
    super()
  }

  public onSubmit() {
    if (this.sendPackageForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(AuthActions.login(
      //   {
      //     username: this.sendPackageForm.get('username').value,
      //     password: this.sendPackageForm.get('password').value
      //   }
      // ));
    }
  }
}
