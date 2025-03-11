import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatingButtonComponent } from '../../../../../common/components/floating-button/floating-button.component';
import { InputSearchComponent } from '../../../../../common/components/input-search/input-search.component';
import { AppConfigConstants } from '../../../../../common/constants/app-config-constants';
import { ResponseDTO, ResponseListDTO } from '../../../../../common/dto/response.dto';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI, API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI } from '../../../../../common/providers/ppi-di';
import { PPIProyectoModel } from '../../../../../domain/models/ppi/ppi-proyecto';
import { PPIProyectoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-proyecto-usecase.service';
import { CreateComponent } from '../create/create.component';
import { UpdateComponent } from '../update/update.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PPIContratoModel } from '../../../../../domain/models/ppi/ppi-contrato';
import { PPIContratoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-contrato-usecase.service';
import { AuthService } from '../../../../../common/services/auth.service';
import { LoaderService } from '../../../../../common/services/loader.service';
import { ListComponent as ListNecesidadInversionComponent } from './../../inversion/list/list.component';

@Component({
  selector: 'app-list-contratos',
  standalone: true,
  imports: [IntegrationModule, RouterLink, InputSearchComponent, FloatingButtonComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    PPIProyectoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI,
    PPIContratoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI
  ]
})
export class ListComponent implements OnInit {

  #rest = inject(PPIContratoUsecaseService);
  #restProject = inject(PPIProyectoUsecaseService);
  #dialog = inject(MatDialog);
  #activatedRoute = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #loadingService = inject(LoaderService);  

  project = signal<PPIProyectoModel>(new PPIProyectoModel());
  search = signal<string>('');
  data = signal<PPIContratoModel[]>([]);
  length = signal<number>(0);
  pageSize = signal<number>(5);
  pageIndex = signal<number>(0);
  pageSizeOptions = AppConfigConstants.PAGE_SIZES_PAGINATOR;
  displayedColumns: string[] = ['codigo', 'objeto', 'fechaInicio', 'fechaTerminacion', 'valorContrato', 'actions'];
  idProject: string = '';
  idEntity: string = '';

  ngOnInit(): void {
    this.idEntity = this.#authService.getEntityId;
    this.#activatedRoute.params.subscribe(params => {
      this.idProject = params['id'];
      this.getProyecto(this.idProject);
      this.getData();
    });
  }

  private getProyecto(id: string) {
    this.#loadingService.show();
    this.#restProject.getById(id).subscribe({
      next: (res: ResponseDTO) => {
        this.#loadingService.hide();
        this.project.set(<PPIProyectoModel>res.data);
      }
    });
  }

  getData() {
    this.#rest!.getAllByIdProjectAndIdEntity(this.idProject, this.idEntity).subscribe({
      next: (res: ResponseListDTO) => {
        this.data.set(<PPIContratoModel[]><unknown>res.data);
        this.length.set(res.data.total);
      }
    });
  }

  create() {
    this.#dialog.open(CreateComponent, { width: '400px', data: this.idProject }).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData();
    });
  }

  update(model: PPIContratoModel) {
    let configDialog = { width: '400px', data: { project: this.idProject, model: model } };
    this.#dialog.open(UpdateComponent, configDialog).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData();
    });
  }

  listInvestment(model: PPIContratoModel) {
    this.#dialog.open(ListNecesidadInversionComponent, { width: '600px', data: model }).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData();
    });
  }

}
