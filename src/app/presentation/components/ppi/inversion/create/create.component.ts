import { Component, inject, signal } from '@angular/core';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI } from '../../../../../common/providers/ppi-di';
import { MessagesService } from '../../../../../common/services/messages.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { ParametricaModel } from '../../../../../domain/models/transversales/parametrica';
import { EntidadModel } from '../../../../../domain/models/transversales/entidad';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { LoaderService } from '../../../../../common/services/loader.service';
import { PPINecesidadInversionUsecaseService } from '../../../../../domain/usecases/ppi/ppi-necesidad-inversion-usecase.service';
import { PPINecesidadInversionModel } from '../../../../../domain/models/ppi/ppi-necesidad-inversion';
import { PPIProyectoModel } from '../../../../../domain/models/ppi/ppi-proyecto';
import { PPIContratoModel } from '../../../../../domain/models/ppi/ppi-contrato';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [
    PPINecesidadInversionUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI    
  ]
})
export class CreateComponent {

  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  readonly data = inject<PPIContratoModel>(MAT_DIALOG_DATA);

  #formBuilder = inject(FormBuilder);
  #rest = inject(PPINecesidadInversionUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);  

  formGroup!: FormGroup;

  ngOnInit(): void {
    console.log(this.data);
    this.formGroup = this.#formBuilder.group({
      idContrato: [this.data.idContrato, Validators.required],      
      valorInversion: [0, Validators.required],
      tipoObra: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    this.#loadingService.show();
    const model = this.formGroup.value;
    model.valorInversion = Number(model.valorInversion.toString().replace(/,/g, ''));
    this.#rest.create(model).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.CREATED);        
        this.dialogRef.close(true);
      }
    });
  }

}
