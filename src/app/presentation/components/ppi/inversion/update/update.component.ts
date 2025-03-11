import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI } from '../../../../../common/providers/ppi-di';
import { MessagesService } from '../../../../../common/services/messages.services';
import { LoaderService } from '../../../../../common/services/loader.service';
import { PPINecesidadInversionUsecaseService } from '../../../../../domain/usecases/ppi/ppi-necesidad-inversion-usecase.service';
import { PPINecesidadInversionModel } from '../../../../../domain/models/ppi/ppi-necesidad-inversion';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss',
  providers: [
    PPINecesidadInversionUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI
  ]
})
export class UpdateComponent {

  readonly dialogRef = inject(MatDialogRef<UpdateComponent>);
  readonly data = inject<PPINecesidadInversionModel>(MAT_DIALOG_DATA);

  #formBuilder = inject(FormBuilder);
  #rest = inject(PPINecesidadInversionUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.#formBuilder.group({
      idNecesidad: ['', Validators.required],
      idContrato: [this.data.idContrato, Validators.required],
      valorInversion: [0, Validators.required],
      tipoObra: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.formGroup.patchValue(this.data);
  }

  onSubmit() {
    this.#loadingService.show();
    const model = this.formGroup.value;
    model.valorInversion = Number(model.valorInversion.toString().replace(/,/g, ''));
    this.#rest.update(this.data.idNecesidad, model).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.UPDATED);
        this.dialogRef.close(true);
      }
    });
  }

}
