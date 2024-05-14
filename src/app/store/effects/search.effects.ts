import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AlphaVantageService } from '../../Services/alpha-vantage.service';
import * as SearchActions from '../actions/search.actions';
import {StockDetails} from "../models/stock";

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private alphaVantageService: AlphaVantageService
  ) {}

  // searchStocks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SearchActions.searchStocks),
  //     switchMap(action =>
  //       this.alphaVantageService.searchStocks(action.query).pipe(
  //         map(results => SearchActions.searchStocksSuccess({ results: results.bestMatches })),
  //         catchError(error => of(SearchActions.searchStocksFailure({ error })))
  //       )
  //     )
  //   )
  // );

  searchStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.searchStocks),
      switchMap(action =>
        this.alphaVantageService.searchStocks(action.query).pipe(
          map(response => {
            const results = response.bestMatches.map((match: any) => ({
              name: match['2. name'],
              symbol: match['1. symbol']
            }));
            return SearchActions.searchStocksSuccess({ results });
          }),
          catchError(error => of(SearchActions.searchStocksFailure({ error })))
        )
      )
    )
  );
}
