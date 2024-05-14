import { createReducer, on } from '@ngrx/store';
import * as HomeActions from '../actions/home.actions';
import { HomeState } from '../models/stock';



export const initialState: HomeState = {
  stocks: [],
  loading: false,
  error: null
};

export const homeReducer = createReducer(
  initialState,
  on(HomeActions.loadHomeStocks, state => ({ ...state, loading: true })),
  on(HomeActions.loadHomeStocksSuccess, (state, { stocks }) => ({
    ...state,
    stocks,
    loading: false
  })),
  on(HomeActions.loadHomeStocksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
