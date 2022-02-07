import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';
import { appLoading } from '../loader/store/loader.actions';
import { MatRadioChange } from '@angular/material/radio';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent {
  public hideRegisterPassword: boolean = true;
  public hideRegisterRepeatPassword: boolean = true;
  
  public showSecurityKeyForm: boolean = false;
  public hideSecurityKey: boolean = true;

  public registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, this.passwordConfirming),
    role: new FormControl(''),
  });
  
  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }

  ngOnInit() {
    this.registerForm.get('role').setValue('USER');
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.store.dispatch(appLoading({ loading: true }));
      this.store.dispatch(AuthActions.register(
        {
          fullName: this.registerForm.get('fullName').value,
          username: this.registerForm.get('username').value,
          email: this.registerForm.get('email').value,
          password: this.registerForm.get('passwords')?.get('password').value,
          role: this.registerForm.get('role').value
        }
      ));
    }
  }

  private passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('repeatPassword').value) {
      return { invalid: true };
    }
  }
  
  // ERRORS
  public getRegisterFullNameErrorMessage() {
    let fullName = this.registerForm.get('fullName');
    if (fullName.hasError('required')) {
      return 'Please enter your full name';
    }

    return fullName.hasError('fullName') ? 'Please enter a valid full name' : '';
  }

  public getRegisterUsernameErrorMessage() {
    let username = this.registerForm.get('username');
    if (username.hasError('required')) {
      return 'Please enter your username';
    }

    return username.hasError('username') ? 'Please enter a valid username' : '';
  }

  public getRegisterEmailErrorMessage() {
    let email = this.registerForm.get('email');
    if (email.hasError('required')) {
      return 'Please enter your email';
    }

    return email.hasError('email') ? 'Please enter a valid email' : '';
  }

  public getSecurityKeyErrorMessage() {
    if (this.showSecurityKeyForm) {
      let securityKey = this.registerForm.get('securityKey');
      if (securityKey.hasError('required')) {
        return 'Please enter your security key';
      }
  
      return securityKey.hasError('securityKey') ? 'Please enter a valid security key' : '';
    }
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
