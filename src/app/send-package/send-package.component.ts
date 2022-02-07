import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import * as SendPackageActions from '../send-package/store/send-package.actions';
import { Observable, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { username } from '../auth/store/auth.selectors';
import { MatRadioChange } from '@angular/material/radio';
import { AppService } from '../app.service';
import { MessageType } from '../models/message-type.enum';

@Component({
  selector: 'app-send-package',
  templateUrl: './send-package.component.html',
  styleUrls: ['./send-package.component.scss']
})
export class SendPackageComponent extends BaseComponent {
  private subscription = new Subscription();

  readonly username$: Observable<string> = this.store.pipe(select(username), takeUntil(this.destroyed$));

  public registeredBy: string;

  public showRecipientAddress: boolean = false;

  public sendPackageForm = new FormGroup({
    sender: new FormControl('', [Validators.required]),
    recipient: new FormControl('', [Validators.required]),
    registeredBy: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    recipientAddress: new FormControl(''),
    sentDate: new FormControl('', [Validators.required]),
    expectedDate: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
  });

  public statusOptions: any[] = [
    { value: 'IN_OFFICE', viewValue: 'In Office' },
    { value: 'IN_COURIER', viewValue: 'In Courier' },
    { value: 'DELIVERED', viewValue: 'Delivered' },
  ];

  constructor(private store: Store<AppState>, 
    private actionsSubject$: ActionsSubject,
    private cdr: ChangeDetectorRef,
    private appService: AppService
    ) {
    super();

    this.username$.pipe(takeUntil(this.destroyed$)).subscribe(username => {
      this.registeredBy = sessionStorage.getItem('username');
    });

    this.subscription.add(this.actionsSubject$.pipe(filter((action) => action.type === '[SendPackage Component] Create Package Success'))
    .subscribe(() => {
      this.appService.openSnackBar("Successfully sent package!", MessageType.Success);
    }));
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

      this.sendPackageForm.reset();
    }
  }

  public onAddressChange(event: MatRadioChange) {
    if (event.value == 'office') {
      this.showRecipientAddress = false;

      this.sendPackageForm.get('recipientAddress').clearValidators();
      this.sendPackageForm.get('recipientAddress').setValue('');
      this.sendPackageForm.get('recipientAddress').markAsPristine();
      this.sendPackageForm.get('recipientAddress').markAsUntouched();
    } else {
      this.showRecipientAddress = true;

      this.sendPackageForm.get('recipientAddress').setValidators(Validators.required);
    }

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
