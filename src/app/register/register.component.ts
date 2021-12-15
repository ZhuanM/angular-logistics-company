import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { appLoading } from '../loader/store/loader.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {
  // @Output() login = new EventEmitter<boolean>();

  // readonly authError$: Observable<string> = this.store.pipe(select(AuthSelectors.authError), takeUntil(this.destroyed$));

  public hideRegisterPassword: boolean = true;
  public hideRegisterRepeatPassword: boolean = true;

  public registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, this.passwordConfirming),
  });
  
  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      // this.store.dispatch(AuthActions.login(
      //   {
      //     email: this.registerForm.get('email').value,
      //     password: this.registerForm.get('password').value
      //   }
      // ));
      
      // this.login.emit(true);
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('repeatPassword').value) {
      return { invalid: true };
    }
  }
  
  // ERRORS
  public getRegisterUsernameErrorMessage() {
    let email = this.registerForm.get('email');
    if (email.hasError('required')) {
      return 'Please enter your email';
    }

    return email.hasError('email') ? 'Please enter a valid email' : '';
  }

  public getRegisterEmailErrorMessage() {
    let email = this.registerForm.get('email');
    if (email.hasError('required')) {
      return 'Please enter your email';
    }

    return email.hasError('email') ? 'Please enter a valid email' : '';
  }

  public getPasswordErrorMessage() {
    let password = this.registerForm.get('passwords')?.get('password');
    if (password.hasError('required')) {
      return 'Please enter your password';
    }

    if (password.errors) {
      return 'Please enter a minimum of eight characters, at least one letter, one number and one special character';
    }
    // return password.hasError('password') ? 'Please enter a minimum of eight characters, at least one letter, one number and one special character' : '';
  }

  public getRepeatPasswordErrorMessage() {
    let repeatPassword = this.registerForm.get('passwords')?.get('repeatPassword');
    if (repeatPassword.hasError('required')) {
      return 'Please confirm your password';
    }

    let password = this.registerForm.get('passwords')?.get('password');
    if (password.errors) {
      return 'Please enter a valid password first';
    }

    if (repeatPassword.errors) {
      return 'Password does not match';
    }
    // return repeatPassword.hasError('repeatPassword') ? 'Password does not match' : '';
  }

  ngOnDestroy() {
    this.store.dispatch(AuthActions.resetErrorState());
  }
}
