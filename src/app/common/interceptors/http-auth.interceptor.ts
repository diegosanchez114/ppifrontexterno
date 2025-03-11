import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { environment } from '../../../environments/environment';

export const httpAuthInterceptor: HttpInterceptorFn = (req, next) => {

  const msalService = inject(MsalService);

  return from(msalService.instance.acquireTokenSilent({
    //scopes: ['User.Read'] // Cambia los scopes según sea necesario
    scopes: [`api://${environment.msalConfig.auth.clientId}/UPITApp`]
  })).pipe(
    switchMap((tokenResponse) => {
      const token = tokenResponse.accessToken;
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    })
  );
};
