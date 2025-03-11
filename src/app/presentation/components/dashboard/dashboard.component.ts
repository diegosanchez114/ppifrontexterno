import { Component } from '@angular/core';
import { IntegrationModule } from '../../../common/modules/integration.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IntegrationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
