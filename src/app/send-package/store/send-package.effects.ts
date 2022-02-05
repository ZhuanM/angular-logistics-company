import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as SendPackageActions from './send-package.actions';
import { SendPackageService } from '../send-package.service';


@Injectable()
export class SendPackageEffects {
  constructor(
    private actions$: Actions,
    private sendPackageService: SendPackageService,
    private router: Router
  ){}

  createPackage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(SendPackageActions.createPackage),
    switchMap(action => {
      return this.sendPackageService.createPackage(
        action.name,
        action.senderUsername,
        action.recipient,
        action.registeredBy,
        action.company,
        action.status,
        action.recipientAddress,
        action.sentDate,
        action.eta,
        action.weight,
        action.price)
      })
    )
  );
}
