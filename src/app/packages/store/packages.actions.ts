import { createAction, props } from "@ngrx/store";

export const getAllPackages = createAction(
    '[Packages Component] Get All Packages'
);

export const getAllPackagesSuccess = createAction(
    '[Packages Component] Get All Packages Success',
    props<{
        packages: any
    }>()
);

export const getUserPackages = createAction(
    '[Packages Component] Get User Packages',
    props<{
        username: string
    }>()
);

export const getUserPackagesSuccess = createAction(
    '[Packages Component] Get User Packages Success',
    props<{
        packages: any
    }>()
);

export const createPackage = createAction(
    '[Packages Component] Create Package',
    props<{
        package: any
    }>()
);

export const createPackageSuccess = createAction(
    '[Packages Component] Create Package Success',
);

export const updatePackage = createAction(
    '[Packages Component] Update Package',
    props<{
        package: any
    }>()
);

export const updatePackageSuccess = createAction(
    '[Packages Component] Update Package Success',
);

export const deletePackage = createAction(
    '[Packages Component] Delete Package',
    props<{
        packageId: any
    }>()
);
