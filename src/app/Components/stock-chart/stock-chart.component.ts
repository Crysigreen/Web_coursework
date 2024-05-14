import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartOptions, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {Observable} from "rxjs";
import {loadStockDetails, loadStocks} from "../../store/actions/stock.actions";
import {selectError, selectLoading, selectStockDetails, selectStocks, selectLatestStockPrice} from "../../store/selectors/stock.selectors";
import {select, Store, StoreModule} from "@ngrx/store";
import {Stock, StockDetails} from "../../store/models/stock";
import {AsyncPipe, CommonModule} from "@angular/common";
import {ErrorMessageComponent} from "../error-message/error-message.component";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {stockReducer} from "../../store/reducers/stock.reducer";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-stock-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe, LoadingSpinnerComponent, ErrorMessageComponent,CommonModule],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})
export class StockChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  stocks$: Observable<Stock[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  stockDetails$: Observable<StockDetails | null>;
  latestStockPrice$: Observable<number | null>;


  public lineChartData: ChartData<'line'> = {
    datasets: [
      {
        data: [],
        label: 'Цена акции',
        borderColor: 'black', // Черный цвет линии
        borderWidth: 2,
        fill: false, // Без заливки
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: (context) => {
            if (context.tick.value === 100.86) {
              return '#cccccc';
            }
            return 'rgba(0,0,0,0.1)';
          },
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  public lineChartType: ChartType = 'line';

  constructor(private store: Store,private route: ActivatedRoute) {
    this.stocks$ = this.store.pipe(select(selectStocks));
    this.loading$ = this.store.pipe(select(selectLoading));
    this.error$ = this.store.pipe(select(selectError));
    this.stockDetails$ = this.store.pipe(select(selectStockDetails));
    this.latestStockPrice$ = this.store.pipe(select(selectLatestStockPrice));
  }

  // ngOnInit(): void {
  //   this.store.dispatch(loadStocks());
  //   this.store.dispatch(loadStockDetails());
  //
  //   this.stocks$.subscribe(stocks => {
  //     if (stocks.length > 0) {
  //       this.lineChartData.datasets[0].data = stocks.map(stock => stock.close);
  //       this.lineChartData.labels = stocks.map(stock => stock.date);
  //       if (this.chart) {
  //         this.chart.update();
  //       }
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const symbol = params.get('symbol');
      if (symbol) {
        this.store.dispatch(loadStocks({ symbol }));
        this.store.dispatch(loadStockDetails({ symbol }));
      }
    });

    this.stocks$.subscribe(stocks => {
      if (stocks.length > 0) {
        this.lineChartData.datasets[0].data = stocks.map(stock => stock.close);
        this.lineChartData.labels = stocks.map(stock => stock.date);
        if (this.chart) {
          this.chart.update();
        }
      }
    });
  }
}
