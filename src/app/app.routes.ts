import { Routes } from '@angular/router';
import {StockChartComponent} from "./Components/stock-chart/stock-chart.component";
import {HomeComponent} from "./Components/home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stock/:symbol', component: StockChartComponent }
];
