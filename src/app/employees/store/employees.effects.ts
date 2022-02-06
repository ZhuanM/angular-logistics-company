import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { EmployeesService } from '../employees.service';
import * as EmployeesActions from './employees.actions';


@Injectable()
export class EmployeesEffects {
    constructor(
        private actions$: Actions,
        private employeesService: EmployeesService,
    ) { }

    getAllEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.getAllEmployees),
            switchMap(action => {
                return this.employeesService.getAllEmployees()
                    .pipe(
                        map(response => {
                            return EmployeesActions.getAllEmployeesSuccess(
                                {
                                    employees: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    createEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.createEmployee),
            switchMap(action => {
                return this.employeesService.createEmployee(action.employee);
            })
        )
    );

    updateEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.updateEmployee),
            switchMap(action => {
                return this.employeesService.updateEmployee(action.employee);
            })
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeesActions.deleteEmployee),
            switchMap(action => {
                return this.employeesService.deleteEmployee(action.employeeUsername);
            })
        )
    );
}
