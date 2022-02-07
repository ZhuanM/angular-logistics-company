import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { appLoading } from '../loader/store/loader.actions';
import { AppState } from '../models/app-state.interface';
import { getAllOffices } from '../offices/store/offices.actions';
import { offices } from '../offices/store/offices.selectors';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
  readonly offices$: Observable<any> = this.store.pipe(select(offices), takeUntil(this.destroyed$));
  public offices: any;
  
  public markers: any = [{
    position: {
      lat: 42.704034, lng: 23.310711
    },
    // label: {
    //   color: 'red',
    //   text: 'Marker label ' + (this.markers.length + 1),
    // },
    // title: 'Marker title ' + (this.markers.length + 1),
    // options: { animation: google.maps.Animation.BOUNCE },
  },
  {
    position: {
      lat: 38.9987208, lng: -77.2538699
    }
  }];

  constructor(private store: Store<AppState>) {
    super();

    this.offices$.pipe(takeUntil(this.destroyed$)).subscribe(offices => {
      if (offices) {
        this.offices = JSON.parse(JSON.stringify(offices));
      }
    });

    this.store.dispatch(appLoading({ loading: true }));
    this.store.dispatch(getAllOffices());
  }
}
