import { createAction, props } from '@ngrx/store';
import {Stock, StockDetails} from "../models/stock";

export const loadStocks = createAction('[Stock] Load Stocks');
export const loadStocksSuccess = createAction('[Stock] Load Stocks Success', props<{ stocks: Stock[] }>());
export const loadStocksFailure = createAction('[Stock] Load Stocks Failure', props<{ error: any }>());

export const loadStockDetails = createAction('[Stock] Load Stock Details');
export const loadStockDetailsSuccess = createAction(
  '[Stock] Load Stock Details Success',
  props<{ details: StockDetails }>()
);
export const loadStockDetailsFailure = createAction(
  '[Stock] Load Stock Details Failure',
  props<{ error: any }>()
);
