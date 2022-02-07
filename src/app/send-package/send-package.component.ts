import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import * as SendPackageActions from '../send-package/store/send-package.actions';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-send-package',
  templateUrl: './send-package.component.html',
  styleUrls: ['./send-package.component.scss']
})
export class SendPackageComponent extends BaseComponent {
  private subscription = new Subscription();

  public sendPackageForm = new FormGroup({
    sender: new FormControl('', [Validators.required]),
    recipient: new FormControl('', [Validators.required]),
    registeredBy: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    recipientAddress: new FormControl('', [Validators.required]),
    sentDate: new FormControl('', [Validators.required]),
    expectedDate: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  });

  public statusOptions: any[] = [
    { value: 'IN_OFFICE', viewValue: 'In Office' },
    { value: 'IN_COURIER', viewValue: 'In Courier' },
    { value: 'DELIVERED', viewValue: 'Delivered' },
  ];

  constructor(private store: Store<AppState>, private actionsSubject$: ActionsSubject) {
    super();

    // THIS IS IN CASE WE NEED TO REFRESH THE WEB PAGE WHEN THE CREATE PACKAGE HAS SUCCEEDED
    // this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[SendPackage Component] Create Package Success'))
    // .subscribe(() => {
    //   location.reload();
    // }));
  }

  public onSubmit() {
    if (this.sendPackageForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(SendPackageActions.createPackage(
        {
          senderUsername: this.sendPackageForm.get('sender').value,
          recipient: this.sendPackageForm.get('recipient').value,
          registeredBy: this.sendPackageForm.get('registeredBy').value,
          status: this.sendPackageForm.get('status').value,
          recipientAddress: this.sendPackageForm.get('recipientAddress').value,
          sentDate: this.sendPackageForm.get('sentDate').value,
          eta: this.sendPackageForm.get('expectedDate').value,
          weight: this.sendPackageForm.get('weight').value,
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
