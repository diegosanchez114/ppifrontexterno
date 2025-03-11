import { Component, inject, OnInit, signal } from '@angular/core';
import { FloatingButtonComponent } from '../../../../../common/components/floating-button/floating-button.component';
import { InputSearchComponent } from '../../../../../common/components/input-search/input-search.component';
import { ResponseDTO } from '../../../../../common/dto/response.dto';
import { IntegrationModule } from '../../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_AVANCE_DI, API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI, API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI } from '../../../../../common/providers/ppi-di';
import { PPIProyectoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-proyecto-usecase.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PPIContratoUsecaseService } from '../../../../../domain/usecases/ppi/ppi-contrato-usecase.service';
import { PPIAvanceUsecaseService } from '../../../../../domain/usecases/ppi/ppi-avance-usecase.service';
import { PPIContratoModel } from '../../../../../domain/models/ppi/ppi-contrato';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../../../common/components/bottom-sheet/bottom-sheet.component';
import { PPIProyectoDTO } from '../../../../../domain/dto/ppi-proyecto-dto';
import { CreateComponent } from '../create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent as CreateNovedadComponent } from './../../novedades/create/create.component';
import { ListComponent as ListNovedadesComponent } from './../../novedades/list/list.component';
import { PPIAvanceDTO } from '../../../../../domain/dto/ppi-avance-dto';
import { LoaderService } from '../../../../../common/services/loader.service';

@Component({
  selector: 'app-list-avances',
  standalone: true,
  imports: [
    IntegrationModule, 
    RouterLink, 
    InputSearchComponent, 
    FloatingButtonComponent, 
    BottomSheetComponent,
    CreateNovedadComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    PPIProyectoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI,
    PPIContratoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI,
    PPIAvanceUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_AVANCE_DI
  ]
})
export class ListComponent implements OnInit {

  #dialog = inject(MatDialog);
  #rest = inject(PPIAvanceUsecaseService);
  #restProject = inject(PPIProyectoUsecaseService);
  #restContract = inject(PPIContratoUsecaseService);
  #activatedRoute = inject(ActivatedRoute);
  #bottomSheet = inject(MatBottomSheet);
  #loadingService = inject(LoaderService);  

  openSidenav: boolean = false;
  total = signal<{percentage: number, money: number}>({ percentage: 0, money: 0 });
  project = signal<PPIProyectoDTO>(new PPIProyectoDTO());
  contract = signal<PPIContratoModel>(new PPIContratoModel());
  data = signal<PPIAvanceDTO[]>([]);
  avanceSelected = signal<PPIAvanceDTO>(new PPIAvanceDTO());
  displayedColumns: string[] = ['fecha', 'porcentajeProgramado', 'porcentajeEjecutado', 'valorEjecutado', 'actions'];

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => {
      this.getContract(params['id']);            
      this.getData(params['id']);
    });
  }

  private getContract(id: string) {
    this.#loadingService.show();
    this.#restContract.getById(id).subscribe({
      next: (res: ResponseDTO) => {
        this.#loadingService.hide();
        this.contract.set(<PPIContratoModel>res.data);
        this.getProyecto(this.contract().idProyecto);
      }
    });
  }

  private getProyecto(id: string) {
    this.#loadingService.show();
    this.#restProject.getById(id).subscribe({
      next: (res: ResponseDTO) => {
        this.#loadingService.hide();
        this.project.set(<PPIProyectoDTO>res.data);
      }
    });
  } 

  getData(id: string) {
    this.#loadingService.show();
    this.#rest!.getAllByIdContract(id).subscribe({
      next: (res: ResponseDTO) => {
        this.#loadingService.hide();
        this.data.set(<PPIAvanceDTO[]><unknown>res.data);
        const totalPercentage = this.data().reduce((acc, item) => acc + item.porcentajeEjecutado, 0);
        const totalMoney = this.data().reduce((acc, item) => acc + item.valorEjecutado, 0);
        this.total.set({ percentage: totalPercentage, money: totalMoney });
      }
    });
  }

  showDataOnBottomSheet(data: PPIAvanceDTO) {
    this.#bottomSheet.open(BottomSheetComponent, { data: '<b>Observaciones: </b>' + data.observaciones });
  }

  create() {
    const model = { 
      idProject: this.contract().idProyecto,
      idContract: this.contract().idContrato,
      totalPercentage: this.total().percentage, 
      totalValue: this.total().money,
      totalValueContract: this.contract().valorContrato
    };

    this.#dialog.open(CreateComponent, { width: '400px', data: model }).afterClosed().subscribe(res => {
      if (!res) return;
      this.getData(this.contract().idContrato);
    });
  }

  showNovedades(model: PPIAvanceDTO) {
    this.#dialog.open(ListNovedadesComponent, { width: '500px', data: model.idAvance });
  }

}
