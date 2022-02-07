import { createAction, props } from "@ngrx/store";

export const getAllOffices = createAction(
    '[Offices Component] Get All Offices'
);

export const getAllOfficesSuccess = createAction(
    '[Offices Component] Get All Offices Success',
    props<{
        offices: any
    }>()
);

export const createOffice = createAction(
    '[Offices Component] Create Office',
    props<{
        office: any
    }>()
);

export const createOfficeSuccess = createAction(
    '[Offices Component] Create Office Success',
);

export const updateOffice = createAction(
    '[Offices Component] Update Office',
    props<{
        office: any
    }>()
);

export const updateOfficeSuccess = createAction(
    '[Offices Component] Update Office Success',
);

export const deleteOffice = createAction(
    '[Offices Component] Delete Office',
    props<{
        officeId: any
    }>()
);

export const deleteOfficeSuccess = createAction(
    '[Offices Component] Delete Office Success',
);

