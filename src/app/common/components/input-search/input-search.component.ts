import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IntegrationModule } from '../../modules/integration.module';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'input-search-component',
	standalone: true,
	imports: [IntegrationModule],
	templateUrl: './input-search.component.html',
	styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements AfterViewInit {

	@Input('placeholder')
	placeholder: string = '';
	@Input('icon')
	icon: string = 'search';
	@Input('debounce')
	debounce: number = 500;

	control: FormControl = new FormControl();

	@Output('changeInput')
	changeInput: EventEmitter<any> = new EventEmitter<any>();
	
	searchUpdate = new Subject<string>();

	ngAfterViewInit(): void {
		this.searchUpdate.pipe(
			debounceTime(this.debounce),
			distinctUntilChanged())
			.subscribe(value => this.changeInput.emit(value));
	}

}
