import { Component, inject, signal } from '@angular/core';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI } from '../../../../../common/providers/ppi-di';
import { MessagesService } from '../../../../../common/services/messages.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { PPIContratoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-contrato-usecase.service';
import { LoaderService } from '../../../../../common/services/loader.service';
import { AuthService } from '../../../../../common/services/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [
    PPIContratoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI        
  ]
})
export class CreateComponent {

  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  #auth = inject(AuthService);
  #formBuilder = inject(FormBuilder);
  #rest = inject(PPIContratoUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);

  formGroup!: FormGroup;

  private idEntity = this.#auth.getEntityId;

  ngOnInit(): void {
    this.formGroup = this.#formBuilder.group({
      idProyecto: [this.data, Validators.required],
      idEntidadResponsable: [this.idEntity, Validators.required],    
      codigo: ['', Validators.required],
      objeto: ['', Validators.required],
      fechaInicioContrato: ['', Validators.required],
      fechaTerminacionContrato: ['', Validators.required],
      valorContrato: [0, Validators.required],
    });
  } 

  onSubmit() {
    this.#loadingService.show();
    const modelForm = this.formGroup.value;
    modelForm.valorContrato = modelForm.valorContrato.toString().replace(/\,/g, '');
    this.#rest.create(modelForm).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.CREATED);
        this.dialogRef.close(true);
      }
    });
  }

}
