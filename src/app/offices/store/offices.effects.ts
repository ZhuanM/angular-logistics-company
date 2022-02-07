import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { OfficesService } from '../offices.service';
import * as OfficesActions from './offices.actions';


@Injectable()
export class OfficesEffects {
    constructor(
        private actions$: Actions,
        private officesService: OfficesService,
    ) { }

    getAllOffices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OfficesActions.getAllOffices),
            switchMap(action => {
                return this.officesService.getAllOffices()
                    .pipe(
                        map(response => {
                            return OfficesActions.getAllOfficesSuccess(
                                {
                                    offices: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createOffice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OfficesActions.createOffice),
            switchMap(action => {
                return this.officesService.createOffice(action.office)
                    .pipe(
                        map(response => {
                            return OfficesActions.createOfficeSuccess();
                        })
                    );
            })
        )
    );

    updateOffice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OfficesActions.updateOffice),
            switchMap(action => {
                return this.officesService.updateOffice(action.office);
            })
        )
    );

    deleteOffice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OfficesActions.deleteOffice),
            switchMap(action => {
                return this.officesService.deleteOffice(action.officeId);
            })
        )
    );
}
