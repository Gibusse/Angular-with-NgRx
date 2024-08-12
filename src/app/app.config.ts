import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Action, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      StoreModule.forRoot<unknown, Action<string>>(),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production
      })
    ]),
    
  ]
};
