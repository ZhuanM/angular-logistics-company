import { Component } from '@angular/core';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends BaseComponent {
  constructor() {
    super();
  }
}
