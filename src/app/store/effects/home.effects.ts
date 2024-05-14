import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {forkJoin, of} from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AlphaVantageService } from '../../Services/alpha-vantage.service';
import * as HomeActions from '../actions/home.actions';
import {StockHome} from "../models/stock";

@Injectable()
export class HomeEffects {

  private symbols = ['AAPL'];
  constructor(
    private actions$: Actions,
    private alphaVantageService: AlphaVantageService
  ) {}

  // loadHomeStocks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(HomeActions.loadHomeStocks),
  //     mergeMap(() =>
  //       this.alphaVantageService.getGlobalQuote('AAPL').pipe(
  //         map(response => {
  //           const stock : StockHome = {
  //             symbol: response["Global Quote"]["01. symbol"],
  //             price: response["Global Quote"]["05. price"],
  //             volume: response["Global Quote"]["06. volume"],
  //             changePercent: response["Global Quote"]["10. change percent"]
  //           };
  //           return HomeActions.loadHomeStocksSuccess({ stocks: [stock] });
  //         }),
  //         catchError(error => of(HomeActions.loadHomeStocksFailure({ error })))
  //       )
  //     )
  //   )
  // );

  // loadHomeStocks$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(HomeActions.loadHomeStocks),
  //     mergeMap(() =>
  //       Promise.all(
  //         this.symbols.map(symbol =>
  //           this.alphaVantageService.getGlobalQuote(symbol).toPromise()
  //         )
  //       ).then(
  //         responses => {
  //           const stocks = responses.map(response => ({
  //             symbol: response["Global Quote"]["01. symbol"],
  //             price: response["Global Quote"]["05. price"],
  //             volume: response["Global Quote"]["06. volume"],
  //             changePercent: response["Global Quote"]["10. change percent"]
  //           }));
  //           return HomeActions.loadHomeStocksSuccess({ stocks });
  //         },
  //         error => HomeActions.loadHomeStocksFailure({ error })
  //       )
  //     )
  //   )
  // );

  loadHomeStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHomeStocks),
      mergeMap(() =>
        forkJoin(
          this.symbols.map(symbol =>
            this.alphaVantageService.getGlobalQuote(symbol).pipe(
              map(response => ({
                symbol: response["Global Quote"]["01. symbol"],
                price: response["Global Quote"]["05. price"],
                volume: response["Global Quote"]["06. volume"],
                changePercent: response["Global Quote"]["10. change percent"]
              })),

            )
          )
        ).pipe(
          map(stocks => HomeActions.loadHomeStocksSuccess({ stocks })),
          catchError(error => of(HomeActions.loadHomeStocksFailure({ error })))
        )
      )
    )
  );
}
