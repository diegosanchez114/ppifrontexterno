import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MsAdalModule } from './common/modules/ms-adal.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpAuthInterceptor } from './common/interceptors/http-auth.interceptor';
import { httpErrorInterceptor } from './common/interceptors/http-error.interceptor';
import { httpRetryInterceptor } from './common/interceptors/http-retry.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom([
      MsAdalModule
    ]),
    provideHttpClient(
      withInterceptors([
        httpAuthInterceptor,
        httpErrorInterceptor,
        httpRetryInterceptor
      ])
    )
  ]  
};
