import { Component } from '@angular/core';
import {RouterOutlet, Routes} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {HomeComponent} from "./Components/home/home.component";
import {HttpClientModule} from "@angular/common/http";
import {ToolbarComponent} from "./Components/toolbar/toolbar.component";
import {StockChartComponent} from "./Components/stock-chart/stock-chart.component";
import {SearchComponent} from "./Components/search/search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, HttpClientModule, ToolbarComponent, StockChartComponent, HomeComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  static routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    // Добавьте другие маршруты здесь
  ];
}
