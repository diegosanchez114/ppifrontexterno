import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IntegrationModule } from '../../common/modules/integration.module';
import { EventMediatorService } from '../../common/services/event-mediator.service';
import { MsalService } from '@azure/msal-angular';
import { MenuFlatNode, MenuNode, MenuThreeComponent } from '../../common/components/menu-three/menu-three.component';
import { AuthService } from '../../common/services/auth.service';
import { SessionDTO } from '../../common/dto/session.dto';

const TREE_DATA_MENU: MenuNode[] = [
  {
    name: 'Dashboard',
    icon: 'dashboard',
    redirect: 'upit/dashboard'
  }, 
  {
    name: 'PPI Proyectos',
    icon: 'work',
    redirect: 'upit/ppi/proyectos'
  },
  {
    name: 'Cerrar sesión',
    icon: 'logout',
    class: 'close-session',
    action: 'logout'
  },
];

@Component({
  selector: 'app-container-public',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    IntegrationModule,
    MenuThreeComponent
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'  
})
export class ContainerComponent implements OnInit {  

  #router = inject(Router);
  #eventMediator = inject(EventMediatorService);
  #authMsalService = inject(MsalService);
  #authService = inject(AuthService);

  loading: boolean = false;
  isLogged = false;
  session = signal<SessionDTO>(new SessionDTO('', ''));
  showBackButton: boolean = false;
  listMenu = signal<MenuNode[]>(TREE_DATA_MENU);

  ngOnInit(): void {
    //Loading
    this.#eventMediator
      .loadingChanged
      .subscribe((data: boolean) => setTimeout(() => this.loading = data, 1000));

    const session = this.#authService.getSession;
    this.session.set(new SessionDTO(session.name, session.preferred_username));   
  }

  onItemClick(node: MenuFlatNode): void {    
    if (node.expandable) return;
    if (node.hasOwnProperty('action') && node.action) 
      return this.handleAction(node.action);
    else {
      if (!node.redirect) return;
      this.#router.navigate([node.redirect]);    
    }
  }

  private handleAction(action: string) {
    switch(action) {
      case 'logout':
        this.logout();
        break;
    }
  }

  private logout(popup?: boolean) {
    if (popup) {
      this.#authMsalService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else this.#authMsalService.logoutRedirect();
  }

}
