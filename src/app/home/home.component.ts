import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent {
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
  }
}
