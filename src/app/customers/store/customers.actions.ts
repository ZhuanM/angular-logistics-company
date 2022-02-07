import { createAction, props } from "@ngrx/store";

export const getAllCustomers = createAction(
    '[Customers Component] Get All Customers'
);

export const getAllCustomersSuccess = createAction(
    '[Customers Component] Get All Customers Success',
    props<{
        customers: any
    }>()
);

export const createCustomer = createAction(
    '[Customers Component] Create Customer',
    props<{
        customer: any
    }>()
);

export const createCustomerSuccess = createAction(
    '[Customers Component] Create Customer Success',
);

export const updateCustomer = createAction(
    '[Customers Component] Update Customer',
    props<{
        customer: any
    }>()
);

export const updateCustomerSuccess = createAction(
    '[Customers Component] Update Customer Success',
);

export const deleteCustomer = createAction(
    '[Customers Component] Delete Customer',
    props<{
        customerUsername: any
    }>()
);
