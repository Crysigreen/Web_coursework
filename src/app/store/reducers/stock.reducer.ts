import { createReducer, on } from '@ngrx/store';
import { loadStocks, loadStocksSuccess, loadStocksFailure } from '../actions/stock.actions';
import {Stock, StockState} from "../models/stock";
import * as StockActions from "../actions/stock.actions";


// export interface StockState {
//   stocks: Stock[];
//   error: any;
//   loading: boolean;
// }

// export const initialState: StockState = {
//   stocks: [],
//   error: null,
//   loading: false
// };

export const initialState: StockState = {
  stocks: [],
  loading: false,
  error: null,
  details: null
};


const _stockReducer = createReducer(
  initialState,
  on(StockActions.loadStocks, state => ({ ...state, loading: true })),
  on(StockActions.loadStocksSuccess, (state, { stocks }) => ({ ...state, loading: false, stocks })),
  on(StockActions.loadStocksFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(StockActions.loadStockDetails, state => ({ ...state, loading: true })),
  on(StockActions.loadStockDetailsSuccess, (state, { details }) => ({ ...state, details, loading: false })),
  on(StockActions.loadStockDetailsFailure, (state, { error }) => ({ ...state, error, loading: false }))
);

export function stockReducer(state: StockState | undefined, action: any) {
  return _stockReducer(state, action);
}

