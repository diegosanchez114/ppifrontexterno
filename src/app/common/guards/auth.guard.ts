import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const authMsalService = inject(MsalService);
  const router = inject(Router);

  await authMsalService.instance.initialize();

  const accounts = authMsalService.instance.getAllAccounts();
  authMsalService.instance.setActiveAccount(accounts[0]);

  if (accounts.length > 0) {
    const token = accounts[0].idToken;
    if (!token) return false;
    
    const isInternalUser = authService.isInternalUser(token);
    if (isInternalUser) router.navigate(['/upit/private/dashboard']);
    else router.navigate(['/upit/public/dashboard']);
  }

  return false;
};
