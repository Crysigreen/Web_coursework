import { createAction, props } from '@ngrx/store';

export const searchStocks = createAction('[Search] Search Stocks', props<{ query: string }>());
export const searchStocksSuccess = createAction('[Search] Search Stocks Success', props<{ results: any[] }>());
export const searchStocksFailure = createAction('[Search] Search Stocks Failure', props<{ error: any }>());
