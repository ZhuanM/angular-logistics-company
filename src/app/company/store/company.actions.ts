import { createAction, props } from "@ngrx/store";

export const getCompanyName = createAction(
    '[Company Component] Get Company Name'
);

export const getCompanyNameSuccess = createAction(
    '[Company Component] Get Company Name Success',
    props<{
        name: string
    }>()
);

export const getCompanyProfit = createAction(
    '[Company Component] Get Company Profit',
    props<{
        startDate: string,
        endDate: string
    }>()
);

export const getCompanyProfitSuccess = createAction(
    '[Company Component] Get Company Profit Success',
    props<{
        profit: any
    }>()
);