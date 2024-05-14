import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Observable, switchMap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {selectSearchError, selectSearchLoading, selectSearchResults} from "../../store/selectors/search.selectors";
import {searchStocks} from "../../store/actions/search.actions";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    RouterModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  searchResults$: Observable<any[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.searchResults$ = this.store.pipe(select(selectSearchResults));
    this.loading$ = this.store.pipe(select(selectSearchLoading));
    this.error$ = this.store.pipe(select(selectSearchError));
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        this.store.dispatch(searchStocks({ query }));
        return this.searchResults$;
      })
    ).subscribe();
  }
}
