import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter, RouterModule, ROUTES} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {provideStore, StoreModule} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {stockReducer} from "./app/store/reducers/stock.reducer";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {StockEffects} from "./app/store/effects/stock.effects";
import {homeReducer} from "./app/store/reducers/home.reducer";
import {HomeEffects} from "./app/store/effects/home.effects";
import {routes} from "./app/app.routes";
import { reducers } from './app/store/reducers';
import { effects } from './app/store/effects';
import {CommonModule} from "@angular/common";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ROUTES, useValue: AppComponent.routes, multi: true },
    provideHttpClient(),
    CommonModule,
    FormsModule,
    provideStore(reducers),
    provideEffects(effects),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(RouterModule.forRoot(AppComponent.routes))
  ]
}).catch(err => console.error(err));
