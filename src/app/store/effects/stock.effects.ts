import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadStocks, loadStocksSuccess, loadStocksFailure } from '../actions/stock.actions';
import { Stock } from '../models/stock';
import * as StockActions from '../actions/stock.actions';

@Injectable()
export class StockEffects {
  private apiKey = 'QVVYRZA97EA2FIYU';
  private symbol = 'AAPL';
  private url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&apikey=${this.apiKey}`;

  private keywords = 'AAPL'

  private urlSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.keywords}&apikey=${this.apiKey}`;


  constructor(private actions$: Actions, private http: HttpClient) {}

  loadStocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.loadStocks),
      mergeMap(action =>
        this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${action.symbol}&apikey=${this.apiKey}`).pipe(
          map(response => {
            const timeSeries = response['Time Series (Daily)'];
            const stocks: Stock[] = Object.keys(timeSeries).map(date => ({
              date,
              close: parseFloat(timeSeries[date]['4. close'])
            }));
            return StockActions.loadStocksSuccess({ stocks });
          }),
          catchError(error => of(StockActions.loadStocksFailure({ error })))
        )
      )
    )
  );

  loadStockDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockActions.loadStockDetails),
      mergeMap(action =>
        this.http.get<any>(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${action.symbol}&apikey=${this.apiKey}`).pipe(
          map(data => {
            const bestMatch = data.bestMatches[0];
            const details = {
              symbol: bestMatch['1. symbol'],
              name: bestMatch['2. name'],
            };
            return StockActions.loadStockDetailsSuccess({ details });
          }),
          catchError(error => of(StockActions.loadStockDetailsFailure({ error })))
        )
      )
    )
  );
}
