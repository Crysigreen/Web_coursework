import { createFeatureSelector, createSelector } from '@ngrx/store';
import {SearchState} from "../models/stock";

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectSearchResults = createSelector(
  selectSearchState,
  (state: SearchState) => state.results
);

export const selectSearchLoading = createSelector(
  selectSearchState,
  (state: SearchState) => state.loading
);

export const selectSearchError = createSelector(
  selectSearchState,
  (state: SearchState) => state.error
);
