import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {StockCardComponent} from "../stock-card/stock-card.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {combineLatest, map, Observable, of} from "rxjs";
import {AlphaVantageService} from "../../Services/alpha-vantage.service";
import {select, Store} from "@ngrx/store";
import {HomeState} from "../../store/models/stock";
import {selectHomeError, selectHomeLoading, selectHomeStocks} from "../../store/selectors/home.selectors";
import {loadHomeStocks} from "../../store/actions/home.actions";
import {ErrorMessageComponent} from "../error-message/error-message.component";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, StockCardComponent, AsyncPipe, CommonModule, ErrorMessageComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// export class HomeComponent implements OnInit {
//   stocks$: Observable<any[]> = of([]); // Инициализация пустым Observable
//   private symbols = ['AAPL'];
//   constructor(private alphaVantageService: AlphaVantageService) {}
//
//   ngOnInit(): void {
//     const requests = this.symbols.map(symbol =>
//       this.alphaVantageService.getGlobalQuote(symbol).pipe(
//         map(response => ({
//           symbol: response["Global Quote"]["01. symbol"],
//           open: response["Global Quote"]["02. open"],
//           high: response["Global Quote"]["03. high"],
//           low: response["Global Quote"]["04. low"],
//           price: response["Global Quote"]["05. price"],
//           volume: response["Global Quote"]["06. volume"],
//           latestTradingDay: response["Global Quote"]["07. latest trading day"],
//           previousClose: response["Global Quote"]["08. previous close"],
//           change: response["Global Quote"]["09. change"],
//           changePercent: response["Global Quote"]["10. change percent"]
//         }))
//       )
//     );
//     this.stocks$ = combineLatest(requests);
//   }
// }

export class HomeComponent implements OnInit {
  stocks$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<HomeState>) {
    this.stocks$ = this.store.pipe(select(selectHomeStocks));
    this.loading$ = this.store.pipe(select(selectHomeLoading));
    this.error$ = this.store.pipe(select(selectHomeError));
  }

  ngOnInit(): void {
    console.log('HomeComponent: dispatching loadHomeStocks');
    this.store.dispatch(loadHomeStocks());
  }
}

