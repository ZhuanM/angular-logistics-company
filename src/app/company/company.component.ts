import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import { getCompanyName, getCompanyProfit } from './store/company.actions';
import { companyName, companyProfit } from './store/company.selectors';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends BaseComponent {
  readonly companyName$: Observable<string> = this.store.pipe(select(companyName), takeUntil(this.destroyed$));
  public companyName: string;

  readonly companyProfit$: Observable<any> = this.store.pipe(select(companyProfit), takeUntil(this.destroyed$));
  public companyProfit: any;

  public profitForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });
  
  constructor(private store: Store<AppState>) { 
    super();

    this.companyName$.pipe(takeUntil(this.destroyed$)).subscribe(companyName => {
      if (companyName) {
        this.companyName = companyName;
      }
    });

    this.companyProfit$.pipe(takeUntil(this.destroyed$)).subscribe(companyProfit => {
      if (companyProfit) {
        this.companyProfit = companyProfit;
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getCompanyName());
  }

  public onProfitSubmit() {
    if (this.profitForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(getCompanyProfit(
        {
          startDate: this.profitForm.get('startDate').value,
          endDate: this.profitForm.get('endDate').value
        }
      ));
    }
  }
}
