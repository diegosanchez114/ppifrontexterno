import { Component, inject, OnInit, signal } from '@angular/core';
import { InputSearchComponent } from '../../../../../common/components/input-search/input-search.component';
import { ResponseDTO } from '../../../../../common/dto/response.dto';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_NOVEDAD_DI } from '../../../../../common/providers/ppi-di';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PPINovedadUsecaseService } from '../../../../../domain/usecases/ppi/ppi-novedad-usecase.service';
import { PPINovedadModel } from '../../../../../domain/models/ppi/ppi-novedad';
import { LoaderService } from '../../../../../common/services/loader.service';

@Component({
  selector: 'app-list-novedades',
  standalone: true,
  imports: [IntegrationModule, InputSearchComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    PPINovedadUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_NOVEDAD_DI
  ]
})
export class ListComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<ListComponent>);
  readonly dataDialog = inject<string>(MAT_DIALOG_DATA);

  #rest = inject(PPINovedadUsecaseService); 
  #loadingService = inject(LoaderService);  

  data = signal<PPINovedadModel[]>([]);
  displayedColumns: string[] = ['fecha', 'descripcion'];

  ngOnInit(): void {
    this.getData(this.dataDialog);
  }    

  getData(id: string) {
    this.#loadingService.show();
    this.#rest!.getAllByIdAvance(id).subscribe({
      next: (res: ResponseDTO) => {
        this.#loadingService.hide();
        this.data.set(<PPINovedadModel[]><unknown>res.data);
      }
    });
  }

}
