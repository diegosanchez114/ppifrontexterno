import { Component, Input } from '@angular/core';
import { IntegrationModule } from '../../modules/integration.module';

@Component({
  selector: 'floating-button-component',
  standalone: true,
  imports: [IntegrationModule],
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {

	@Input('color') color: string = 'primary';
	@Input('icon') icon: string = 'add';
	@Input('tooltip') tooltip: string = 'Crear';
	@Input('disabled') disabled: boolean = false;
	
}
