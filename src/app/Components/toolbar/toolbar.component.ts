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
  styleUrl: './toolbar.css'
})
export class ToolbarComponent {

  constructor() {
  }

  ngOnInit(): void {

  }

}
