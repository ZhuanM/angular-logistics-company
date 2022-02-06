import { createAction, props } from "@ngrx/store";

export const getAllEmployees = createAction(
    '[Employees Component] Get All Employees'
);

export const getAllEmployeesSuccess = createAction(
    '[Employees Component] Get All Employees Success',
    props<{
        employees: any
    }>()
);

export const createEmployee = createAction(
    '[Employees Component] Create Employee',
    props<{
        employee: any
    }>()
);

export const updateEmployee = createAction(
    '[Employees Component] Update Employee',
    props<{
        employee: any
    }>()
);

export const updateEmployeeSuccess = createAction(
    '[Employees Component] Update Employee Success',
);

export const deleteEmployee = createAction(
    '[Employees Component] Delete Employee',
    props<{
        employeeUsername: any
    }>()
);
