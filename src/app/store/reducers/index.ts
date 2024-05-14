import { ActionReducerMap } from '@ngrx/store';
import { stockReducer } from './stock.reducer';
import { homeReducer } from './home.reducer';
import {HomeState, SearchState, StockState} from "../models/stock";
import {searchReducer} from "./search.reducer";


export interface AppState {
  stock: StockState;
  home: HomeState;
  search: SearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  stock: stockReducer,
  home: homeReducer,
  search: searchReducer,
};
