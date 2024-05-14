import { createAction, props } from '@ngrx/store';
import {StockHome} from '../models/stock';

export const loadHomeStocks = createAction('[Home] Load Home Stocks');
export const loadHomeStocksSuccess = createAction('[Home] Load Home Stocks Success', props<{ stocks: StockHome[] }>());
export const loadHomeStocksFailure = createAction('[Home] Load Home Stocks Failure', props<{ error: any }>());
