import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {RouterModule, ROUTES} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ROUTES, useValue: AppComponent.routes, multi: true },
    provideHttpClient(),
    FormsModule,
    importProvidersFrom(RouterModule.forRoot(AppComponent.routes))
  ]
}).catch(err => console.error(err));
