import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';
import * as LoaderSelectors from '../loader/store/loader.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent extends BaseComponent {
  readonly loading$: Observable<boolean> = this.store.pipe(select(LoaderSelectors.loading), takeUntil(this.destroyed$));

  constructor(private store: Store<AppState>) { 
    super()
  }
}
