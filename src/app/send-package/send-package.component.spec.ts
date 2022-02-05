import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SendPackageComponent } from './send-package.component';

describe('SendPackageComponent', () => {
  let component: SendPackageComponent;
  let fixture: ComponentFixture<SendPackageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
