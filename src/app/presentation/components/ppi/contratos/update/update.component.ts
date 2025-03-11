import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { MessagesService } from '../../../../../common/services/messages.services';
import { CreateComponent } from '../create/create.component';
import { PPIContratoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-contrato-usecase.service';
import { API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI } from '../../../../../common/providers/ppi-di';
import { PPIContratoModel } from '../../../../../domain/models/ppi/ppi-contrato';
import { LoaderService } from '../../../../../common/services/loader.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [
    PPIContratoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI 
  ]
})
export class UpdateComponent {

  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  readonly data = inject<{ project: string, model: PPIContratoModel }>(MAT_DIALOG_DATA);

  #formBuilder = inject(FormBuilder);
  #rest = inject(PPIContratoUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);  

  formGroup!: FormGroup;

  ngOnInit(): void {  
    this.formGroup = this.#formBuilder.group({
      idContrato: ['', Validators.required],
      idEntidadResponsable: ['', Validators.required],
      codigo: ['', Validators.required],
      objeto: ['', Validators.required],
      fechaInicioContrato: ['', Validators.required],
      fechaTerminacionContrato: ['', Validators.required],
      valorContrato: [0, Validators.required]
    });
    this.formGroup.patchValue(this.data.model);
  }  

  public onSubmit() {
    this.#loadingService.show();
    const modelForm = this.formGroup.value;
    modelForm.valorContrato = modelForm.valorContrato.toString().replace(/\,/g, '');
    this.#rest.update(this.data.model.idContrato, modelForm).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.UPDATED);
        this.dialogRef.close(true);
      }
    });
  }

}
