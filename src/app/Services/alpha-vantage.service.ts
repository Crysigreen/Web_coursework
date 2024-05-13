import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {StockMatch, StockSearchResult} from "../Models/stock-search-result";

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  private baseUrl = 'https://www.alphavantage.co/query';
  private apiKey = 'NDRJEMPQ2NGD4JL9';

  constructor(private http: HttpClient) {}

  public getDailyStock(symbol: string): Observable<any> {
    const params = {
      function: 'TIME_SERIES_DAILY',
      symbol: symbol,
      apikey: this.apiKey
    };
    return this.http.get(this.baseUrl, { params });
  }

  public getGlobalQuote(symbol: string): Observable<any> {
    const params = {
      function: 'GLOBAL_QUOTE',
      symbol: symbol,
      apikey: this.apiKey
    };
    return this.http.get(this.baseUrl, { params });
  }

  public searchStocks(keywords: string): Observable<StockSearchResult[]> {
    const params = {
      function: 'SYMBOL_SEARCH',
      keywords: keywords,
      apikey: this.apiKey
    };
    return this.http.get<{bestMatches: StockMatch[]}>(this.baseUrl, {params}).pipe(
      map(response => response.bestMatches.map((stock: StockMatch) => ({
        symbol: stock["1. symbol"],
        name: stock["2. name"],
        type: stock["3. type"],
        region: stock["4. region"],
        marketOpen: stock["5. marketOpen"],
        marketClose: stock["6. marketClose"],
        timezone: stock["7. timezone"],
        currency: stock["8. currency"],
        matchScore: stock["9. matchScore"]
      })))
    );
  }
}
