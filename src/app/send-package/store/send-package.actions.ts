import { createAction, props } from "@ngrx/store";

export const createPackage = createAction(
    '[SendPackage Component] Create Package',
    props<{
        senderUsername: string,
        recipient: string,
        registeredBy: string,
        status: string,
        recipientAddress: string,
        sentDate: string,
        eta: string,
        weight: string,
    }>()
);

export const createPackageSuccess = createAction(
    '[SendPackage Component] Create Package Success',
);