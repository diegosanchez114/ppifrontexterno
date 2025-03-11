import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
	{
		path: 'upit',
		title: 'UPIT',
		loadComponent: () => import('./presentation/container/container.component').then(m => m.ContainerComponent),
		canActivateChild: [MsalGuard],
		children: [
			{
				path: 'dashboard',
				title: 'Dashboard',
				loadComponent: () => import('./presentation/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
			},
			{
				path: 'ppi/proyectos',
				title: 'Projectos internos',
				loadComponent: () => import('./presentation/components/ppi/proyectos/list.component').then(m => m.ListComponent)
			},
			{
				path: 'ppi/proyectos/:id/contratos',
				title: 'Projectos internos',
				loadComponent: () => import('./presentation/components/ppi/contratos/list/list.component').then(m => m.ListComponent)
			},
			{
				path: 'ppi/proyectos/contratos/:id/avances',
				title: 'PPI Avances',
				loadComponent: () => import('./presentation/components/ppi/avances/list/list.component').then(m => m.ListComponent)
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: 'upit',
		pathMatch: 'full'
	}
];
