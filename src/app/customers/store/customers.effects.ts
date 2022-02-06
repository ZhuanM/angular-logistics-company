import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import * as CustomersActions from './customers.actions';


@Injectable()
export class CustomersEffects {
    constructor(
        private actions$: Actions,
        private customersService: CustomersService,
    ) { }

    getAllCustomers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomersActions.getAllCustomers),
            switchMap(action => {
                return this.customersService.getAllCustomers()
                    .pipe(
                        map(response => {
                            return CustomersActions.getAllCustomersSuccess(
                                {
                                    customers: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomersActions.createCustomer),
            switchMap(action => {
                return this.customersService.createCustomer(action.customer);
            })
        )
    );

    updateCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomersActions.updateCustomer),
            switchMap(action => {
                return this.customersService.updateCustomer(action.customer);
            })
        )
    );

    deleteCustomer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CustomersActions.deleteCustomer),
            switchMap(action => {
                return this.customersService.deleteCustomer(action.customerUsername);
            })
        )
    );
}
