import { createReducer, on } from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import {SearchState} from "../models/stock";

export const initialState: SearchState = {
  results: [],
  loading: false,
  error: null
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.searchStocks, state => ({ ...state, loading: true })),
  on(SearchActions.searchStocksSuccess, (state, { results }) => ({
    ...state,
    results,
    loading: false
  })),
  on(SearchActions.searchStocksFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
