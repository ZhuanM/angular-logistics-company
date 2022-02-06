import { createAction, props } from "@ngrx/store";

export const createPackage = createAction(
    '[SendPackage Component] Create Package',
    props<{
        name: string,
        senderUsername: string,
        recipient: string,
        registeredBy: string,
        status: string,
        recipientAddress: string,
        sentDate: string,
        eta: string,
        weight: string,
        price: string
    }>()
);