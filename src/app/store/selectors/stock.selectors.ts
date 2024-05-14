import { createFeatureSelector, createSelector } from '@ngrx/store';
import {StockState} from "../models/stock";

export const selectStockState = createFeatureSelector<StockState>('stock');

export const selectStocks = createSelector(
  selectStockState,
  (state: StockState) => state ? state.stocks : []
);

export const selectLoading = createSelector(
  selectStockState,
  (state: StockState) => state ? state.loading : false
);

export const selectError = createSelector(
  selectStockState,
  (state: StockState) => state ? state.error : null
);

export const selectStockDetails = createSelector(
  selectStockState,
  (state: StockState) => state ? state.details : null
);

export const selectLatestStockPrice = createSelector(
  selectStocks,
  (stocks) => stocks.length > 0 ? stocks[stocks.length - 1].close : null
);
