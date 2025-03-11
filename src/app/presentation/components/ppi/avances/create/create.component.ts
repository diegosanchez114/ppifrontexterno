import { Component, inject, signal } from '@angular/core';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_AVANCE_DI } from '../../../../../common/providers/ppi-di';
import { MessagesService } from '../../../../../common/services/messages.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponsesConstants } from '../../../../../common/constants/responses-constants';
import { OnlyNumbersDirective } from '../../../../../common/directives/only-numbers.directive';
import { PPIAvanceUsecaseService } from '../../../../../domain/usecases/ppi/ppi-avance-usecase.service';
import { LoaderService } from '../../../../../common/services/loader.service';

export interface InfoAvance {
  idProject: string;
  idContract: string;
  totalPercentage: number;
  totalValue: string;
  totalValueContract: string;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [IntegrationModule, OnlyNumbersDirective],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [
    PPIAvanceUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_AVANCE_DI
  ]
})
export class CreateComponent {

  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  readonly data = inject<InfoAvance>(MAT_DIALOG_DATA);

  #formBuilder = inject(FormBuilder);
  #rest = inject(PPIAvanceUsecaseService);
  #messagesService = inject(MessagesService);
  #loadingService = inject(LoaderService);  

  formGroup!: FormGroup;
  valueToExecute = signal<number>(0);
  total = signal<number>(0);
  isHigherThanTotal = signal<boolean>(false);

  ngOnInit(): void {
    this.total.set(Number(this.data.totalValue));
    this.valueToExecute.set(Number(this.data.totalValueContract) - Number(this.data.totalValue));

    this.formGroup = this.#formBuilder.group({
      idProyecto: [this.data.idProject, Validators.required],
      idContrato: [this.data.idContract, Validators.required],
      fecha: [new Date(), Validators.required],
      porcentajeProgramado: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      porcentajeEjecutado: [0, [Validators.min(0), Validators.max(100)]],
      valorEjecutado: [0, Validators.required],
      observaciones: ['', Validators.nullValidator]
    });

    this.formGroup.get('idProyecto')?.setValue(this.data.idProject);
    this.formGroup.get('idContrato')?.setValue(this.data.idContract);

    this.formGroup.get('valorEjecutado')?.valueChanges.subscribe({
      next: (value) => this.totalValorEjecutado(value)
    });
  }

  get porcentajeEjecutado() {
    return this.formGroup.get('porcentajeEjecutado')!.value;  
  }

  private totalValorEjecutado(value: number) {
    const cleanValue = value.toString().replace(/,/g, '');
    const total = Number(this.data.totalValue) + Number(cleanValue);
    this.total.set(total);
    this.valueToExecute.set(Number(this.data.totalValueContract) - total);
    this.isHigherThanTotal.set(total > Number(this.data.totalValueContract));
  }

  onSubmit() {
    this.#loadingService.show();
    const model = this.formGroup.value;
    model.valorEjecutado = Number(model.valorEjecutado.toString().replace(/,/g, ''));
    this.#rest.create(model).subscribe({
      next: (res) => {
        this.#loadingService.hide();
        this.#messagesService.openSnackBar(ResponsesConstants.CREATED);
        this.dialogRef.close(true);
      }
    });
  }

}
