import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { CompanyService } from '../company.service';
import * as CompanyActions from './company.actions';


@Injectable()
export class CompanyEffects {
    constructor(
        private actions$: Actions,
        private companyService: CompanyService,
    ) { }

    getCompanyName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.getCompanyName),
            switchMap(action => {
                return this.companyService.getCompanyName()
                    .pipe(
                        map(response => {
                            return CompanyActions.getCompanyNameSuccess(
                                {
                                    name: response.name,
                                }
                            )
                        }),
                    );
            })
        )
    );

    getCompanyProfit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyActions.getCompanyProfit),
            switchMap(action => {
                return this.companyService.getCompanyProfit(action.startDate, action.endDate)
                    .pipe(
                        map(response => {
                            return CompanyActions.getCompanyProfitSuccess(
                                {
                                    profit: response,
                                }
                            )
                        }),
                    );
            })
        )
    );
}
