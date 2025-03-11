import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { UpdateComponent } from '../update/update.component';
import { CreateComponent } from '../create/create.component';
import { ResponseListDTO } from '../../../../../common/dto/response.dto';
import { API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI } from '../../../../../common/providers/ppi-di';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { LoaderService } from '../../../../../common/services/loader.service';
import { PPINecesidadInversionUsecaseService } from '../../../../../domain/usecases/ppi/ppi-necesidad-inversion-usecase.service';
import { PPINecesidadInversionModel } from '../../../../../domain/models/ppi/ppi-necesidad-inversion';
import { PPIContratoModel } from '../../../../../domain/models/ppi/ppi-contrato';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [IntegrationModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    PPINecesidadInversionUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI
  ]
})
export class ListComponent implements AfterViewInit {

  readonly dataContract = inject<PPIContratoModel>(MAT_DIALOG_DATA);

  #rest = inject(PPINecesidadInversionUsecaseService);
  #dialog = inject(MatDialog);
  #loadingService = inject(LoaderService);

  data = signal<PPINecesidadInversionModel[]>([]);
  displayedColumns: string[] = ['valorInversion', 'tipoObra', 'descripcion', 'actions'];

  ngAfterViewInit(): void {
    this.getData();
  }

  getData() {
    this.#loadingService.show();
    this.#rest!.getAllByIdContract(this.dataContract.idContrato).subscribe({
      next: (res: ResponseListDTO) => {
        this.data.set(<PPINecesidadInversionModel[]><unknown>res.data);
        this.#loadingService.hide();
      }
    });
  }

  create() {
    this.#dialog.open(CreateComponent, { width: '400px', data: this.dataContract }).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData();
    });
  }

  update(model: PPINecesidadInversionModel) {
    let configDialog = { width: '400px', data: model };
    this.#dialog.open(UpdateComponent, configDialog).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData();
    });
  }

}
