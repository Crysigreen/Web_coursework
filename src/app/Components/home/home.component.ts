import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {StockCardComponent} from "../stock-card/stock-card.component";
import {AsyncPipe, CommonModule} from "@angular/common";
import {combineLatest, map, Observable, of} from "rxjs";
import {AlphaVantageService} from "../../Services/alpha-vantage.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, StockCardComponent, AsyncPipe,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  stocks$: Observable<any[]> = of([]); // Инициализация пустым Observable
  private symbols = ['AAPL'];
  constructor(private alphaVantageService: AlphaVantageService) {}

  ngOnInit(): void {
    // const requests = this.symbols.map(symbol =>
    //   this.alphaVantageService.getGlobalQuote(symbol).pipe(
    //     map(response => ({
    //       symbol: response["Global Quote"]["01. symbol"],
    //       open: response["Global Quote"]["02. open"],
    //       high: response["Global Quote"]["03. high"],
    //       low: response["Global Quote"]["04. low"],
    //       price: response["Global Quote"]["05. price"],
    //       volume: response["Global Quote"]["06. volume"],
    //       latestTradingDay: response["Global Quote"]["07. latest trading day"],
    //       previousClose: response["Global Quote"]["08. previous close"],
    //       change: response["Global Quote"]["09. change"],
    //       changePercent: response["Global Quote"]["10. change percent"]
    //     }))
    //   )
    // );
    //
    // this.stocks$ = combineLatest(requests);
  }


}
