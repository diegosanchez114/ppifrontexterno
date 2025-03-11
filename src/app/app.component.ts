import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthService } from './common/services/auth.service';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { ParametricaUsecaseService } from './domain/usecases/transversales/parametrica-usecase.service';
import { ResponseDTO } from './common/dto/response.dto';
import { API_GATEWAYS_PROVIDERS_PARAMETRICA_DI } from './common/providers/transversales-di';
import { ParametricaModel } from './domain/models/transversales/parametrica';

const PARAMETRIC = 'LOGIN_DOMINIO';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ParametricaUsecaseService,
    API_GATEWAYS_PROVIDERS_PARAMETRICA_DI
  ]
})
export class AppComponent implements OnInit {

  #auth = inject(AuthService);
  #msalBroadcastService = inject(MsalBroadcastService);
  #parametricaService = inject(ParametricaUsecaseService);
  #msalAuthService = inject(MsalService);

  destroying$ = new Subject<void>();

  ngOnInit(): void {
    this.#msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this.destroying$)
      )
      .subscribe(() => {
        this.#auth.checkSession();
        const account = this.#msalAuthService.instance.getActiveAccount();
        if (!account) return;
        this.getEntityId(account);
      });


    // this.#msalBroadcastService.inProgress$.pipe(
    //   filter((status: InteractionStatus) => status === InteractionStatus.None),
    //   takeUntil(this.destroying$)
    // ).subscribe(() => {
    //   this.#auth.enableAccount();  
    //   const accounts = this.#msalAuthService.instance.getActiveAccount();
    //   if (!accounts) return;      
    //   this.getEntityId(accounts);      
    // }); 
  }

  private getEntityId(account: AccountInfo) {
    this.#parametricaService.getByName(PARAMETRIC).subscribe({
      next: (res: ResponseDTO) => {
        const token = account.idToken;
        if (!token) return;
        const dataToken = this.#auth.extractTokenInfo(token);
        const domain = dataToken['preferred_username'].split('@')[1];
        const entities = <ParametricaModel[]>res.data;
        const parametric = <ParametricaModel>entities.find(e => e.valor.includes(domain));
        if (parametric) this.#auth.setEntityId = parametric.descripcion;
      }
    });
  }

}
