import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';

export const authChildGuard: CanActivateChildFn = async (childRoute, state) => {
  const authService = inject(AuthService);
  const authMsalService = inject(MsalService);
  
  await authMsalService.instance.initialize();

  const accounts = authMsalService.instance.getAllAccounts();
  authMsalService.instance.setActiveAccount(accounts[0]);

  if (accounts.length > 0) {
    const token = accounts[0].idToken;
    if (!token) return false;
    
    const isInternalUser = authService.isInternalUser(token);
    if (state.url.indexOf('upit/private') > -1 && isInternalUser) 
      return true;
    else if (state.url.indexOf('upit/public') > -1 && !isInternalUser)
      return true;
    else return false;    
  }
  return false;
};
