import { Component, inject, input, OnInit, output } from '@angular/core';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_NOVEDAD_DI } from '../../../../../common/providers/ppi-di';
import { MessagesService } from '../../../../../common/services/messages.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { PPINovedadUsecaseService } from '../../../../../domain/usecases/ppi/ppi-novedad-usecase.service';
import { LoaderService } from '../../../../../common/services/loader.service';

@Component({
  selector: 'app-create-novedad',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [
    PPINovedadUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_NOVEDAD_DI
  ]
})
export class CreateComponent implements OnInit {

  idAvance = input.required<string>();
  onSuccess = output<boolean>();

  #formBuilder = inject(FormBuilder);
  #rest = inject(PPINovedadUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);  

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.#formBuilder.group({
      fecha: [new Date(), Validators.required],
      descripcion: ['', Validators.compose([
        Validators.required, 
        Validators.min(10), 
        Validators.max(10), 
        Validators.minLength(10), 
        Validators.maxLength(1000)
      ])],
    });
  }

  onSubmit() {
    this.#loadingService.show();
    const model = this.formGroup.value;
    model.idAvance = this.idAvance();
    this.#rest.create(model).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.CREATED);
        this.onSuccess.emit(true);
      }
    });
  }

}
