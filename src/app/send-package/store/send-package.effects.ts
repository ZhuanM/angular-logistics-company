import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as SendPackageActions from './send-package.actions';
import { SendPackageService } from '../send-package.service';


@Injectable()
export class SendPackageEffects {
  constructor(
    private actions$: Actions,
    private sendPackageService: SendPackageService,
  ){}

  createPackage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(SendPackageActions.createPackage),
    switchMap(action => {
      return this.sendPackageService.createPackage(
        action.senderUsername,
        action.recipient,
        action.registeredBy,
        action.status,
        action.recipientAddress,
        action.sentDate,
        action.eta,
        action.weight)
        .pipe(
          map(() => {
            return SendPackageActions.createPackageSuccess();
          })
        );
      })
    )
  );
}
