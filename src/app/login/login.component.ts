import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { Store, select } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { AppState } from '../models/app-state.interface';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { appLoading } from '../loader/store/loader.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {
  @Output() login = new EventEmitter<boolean>();

  readonly authError$: Observable<string> = this.store.pipe(select(AuthSelectors.authError), takeUntil(this.destroyed$));

  public hideLoginPassword: boolean = true;

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // Validators.minLength(8), Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~{}()|_^<>=\\-+:;,\\./[\\]\\`@$!%*#?&])[A-Za-z\\d~{}()|_^<>=\\-+:;,\\./[\\]\\`@$!%*#?&]{8,}$" for password when all newly registered accounts have this password pattern
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(AuthActions.login(
        {
          email: this.loginForm.get('email').value,
          password: this.loginForm.get('password').value
        }
      ));
      
      this.login.emit(true);
    }
  }
  
  // ERRORS
  public getLoginEmailErrorMessage() {
    let email = this.loginForm.get('email');
    if (email.hasError('required')) {
      return 'Please enter your email';
    }

    return email.hasError('email') ? 'Please enter a valid email' : '';
  }

  public getLoginPasswordErrorMessage() {
    let password = this.loginForm.get('password');
    if (password.hasError('required')) {
      return 'Please enter your password';
    }

    return password.hasError('password') ? 'Please enter a valid password' : '';
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.resetErrorState());
  }
}
