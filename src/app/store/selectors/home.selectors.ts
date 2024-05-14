import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from '../reducers/home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectHomeStocks = createSelector(
  selectHomeState,
  (state: HomeState) => state.stocks
);

export const selectHomeLoading = createSelector(
  selectHomeState,
  (state: HomeState) => state.loading
);

export const selectHomeError = createSelector(
  selectHomeState,
  (state: HomeState) => state.error
);
