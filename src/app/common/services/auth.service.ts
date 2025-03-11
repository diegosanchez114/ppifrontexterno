import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageConstants } from '../constants/storage-constants';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  #router = inject(Router);
  #storage = inject(StorageService);
  #authMsalService = inject(MsalService);
  
  #session: any = {};
  #activeAccount: any = {};
  #entityId: string = '';

  constructor() {
    const dataStorage = this.#storage.retrieveData(StorageConstants.STORAGE_ENTITY_ID);
    if (dataStorage) this.#entityId = dataStorage;
    this.checkLogin();
  }

  private checkLogin() {
    this.#authMsalService.instance.initialize().then(() => {
      const accounts = this.#authMsalService.instance.getAllAccounts();
      this.#authMsalService.instance.setActiveAccount(accounts[0]);
      
      if (accounts.length > 0) {
        this.#activeAccount = accounts[0];
        const token = accounts[0].idToken;        
        if (!token) return;
        this.#session = this.extractTokenInfo(token);
      }
    });
  }
  
  get getSession(): any {
    return this.#session;
  }
  
  get isLogged(): boolean {
    return !!this.#session;
  }

  get getActiveAccount(): any {
    return this.#activeAccount;
  }

  get getEntityId(): string {    
    return this.#entityId.replaceAll('"', '');
  }

  set setEntityId(entityId: string) {
    this.#entityId = entityId;
    this.#storage.saveData(StorageConstants.STORAGE_ENTITY_ID, entityId);
  }

  enableAccount() {
    const accounts = this.#authMsalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.#activeAccount = accounts[0];
      this.#authMsalService.instance.setActiveAccount(accounts[0]);
    }
  }

  checkSession() {
    const accounts = this.#authMsalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.#authMsalService.instance.setActiveAccount(accounts[0]);
      this.aquireToken();
    } else this.login();
  }

  login() {
    // const loginRequest = {
    //   scopes: ["api://f9194c29-9f9e-42fb-8958-bc91ab49d0dd/access_as_user"] // optional Array<string>
    // };
    this.#authMsalService.instance.initialize().then(() => {
      this.#authMsalService.instance.loginRedirect().then(() => { //loginRequest
        const accounts = this.#authMsalService.instance.getAllAccounts();       
        this.#authMsalService.instance.setActiveAccount(accounts[0]);

        this.#authMsalService.instance.acquireTokenSilent({
          account: accounts[0],
          scopes: []
        }).then((response) => {
          this.saveSession(accounts[0]);
        });

        this.#authMsalService.instance.handleRedirectPromise()
          .then(res => this.#router.navigate(['/']))
          .catch(err => console.error(err));
      });
    });
  }

  aquireToken() {
    const accounts = this.#authMsalService.instance.getAllAccounts();
    this.#authMsalService.instance.setActiveAccount(accounts[0]);

    this.#authMsalService.instance.acquireTokenSilent({
      account: accounts[0],
      scopes: []
    }).then((response) => {
      this.saveSession(accounts[0]);
    });
  }


  saveSession(session: any) {
    this.#storage.removeData(StorageConstants.STORAGE_SESSION);
    this.#storage.saveData(StorageConstants.STORAGE_SESSION, session);
    this.#session = session;
  }

  extractTokenInfo(token: string) {
    if (!token) return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    if (!jsonPayload) return null;
    const tokenInfo = JSON.parse(jsonPayload);
    return tokenInfo;
  }

  isInternalUser(token: string): boolean {
    const tokenInfo = this.extractTokenInfo(token);
    if (!tokenInfo) return false;
    return tokenInfo['preferred_username'].includes('@upit.gov.co');
  }

}
