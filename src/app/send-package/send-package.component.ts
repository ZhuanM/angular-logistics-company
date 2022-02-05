import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import * as SendPackageActions from '../send-package/store/send-package.actions';

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
    company: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    recipientAddress: new FormControl('', [Validators.required]),
    sentDate: new FormControl('', [Validators.required]),
    expectedDate: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  public statusOptions: any[] = [
    { value: 'IN_OFFICE', viewValue: 'In Office' },
    { value: 'IN_COURIER', viewValue: 'In Courier' },
    { value: 'DELIVERED', viewValue: 'Delivered' },
  ];
  
  constructor(private store: Store<AppState>) { 
    super()
  }

  public onSubmit() {
    if (this.sendPackageForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(SendPackageActions.createPackage(
        {
          name: this.sendPackageForm.get('name').value,
          senderUsername: this.sendPackageForm.get('sender').value,
          recipient: this.sendPackageForm.get('recipient').value,
          registeredBy: this.sendPackageForm.get('registeredBy').value,
          company: this.sendPackageForm.get('company').value,
          status: this.sendPackageForm.get('status').value,
          recipientAddress: this.sendPackageForm.get('recipientAddress').value,
          sentDate: this.sendPackageForm.get('sentDate').value,
          eta: this.sendPackageForm.get('expectedDate').value,
          weight: this.sendPackageForm.get('weight').value,
          price: this.sendPackageForm.get('price').value
        }
      ));
    }
  }
}
