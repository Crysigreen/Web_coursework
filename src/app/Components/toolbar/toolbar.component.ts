import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {AlphaVantageService} from "../../Services/alpha-vantage.service";
import {StockSearchResult} from "../../Models/stock-search-result";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIcon,
    MatFormField,
    AsyncPipe
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  searchQuery: string = '';
  searchResults$!: Observable<StockSearchResult[]>;
  private searchTerms = new Subject<string>();

  constructor(private alphaVantageService: AlphaVantageService) {
  }

  ngOnInit(): void {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),         // waits 300ms after each keystroke before considering the term
      distinctUntilChanged(),    // ignore if next search term is same as the previous
      switchMap((term: string) => this.alphaVantageService.searchStocks(term))
    );
  }

  onSearchChange(): void {
    this.searchTerms.next(this.searchQuery);
  }

  selectStock(stock: StockSearchResult): void {
    console.log('Selected stock:', stock);
    // Здесь может быть логика для перехода на страницу акции или что-то ещё
  }
}
