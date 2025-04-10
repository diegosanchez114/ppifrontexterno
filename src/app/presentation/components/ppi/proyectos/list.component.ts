import { AfterViewInit, Component, Inject, inject, signal, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

import { Router, RouterLink } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FloatingButtonComponent } from '../../../../common/components/floating-button/floating-button.component';
import { InputSearchComponent } from '../../../../common/components/input-search/input-search.component';
import { AppConfigConstants } from '../../../../common/constants/app-config-constants';
import { ResponseListDTO } from '../../../../common/dto/response.dto';
import { IntegrationModule } from '../../../../common/modules/integration.module';
import { API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI } from '../../../../common/providers/ppi-di';
import { PPIProyectoDTO } from '../../../../domain/dto/ppi-proyecto-dto';
import { PPIProyectoUsecaseService } from '../../../../domain/usecases/ppi/ppi-proyecto-usecase.service';
import { AuthService } from '../../../../common/services/auth.service';
import { LoaderService } from '../../../../common/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ObservationComponent } from '../../../../common/components/observation/observation.component';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-proyectos',
  standalone: true,
  imports: [IntegrationModule, RouterLink, InputSearchComponent, FloatingButtonComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [
    PPIProyectoUsecaseService,
    API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI
  ]
})
export class ListComponent implements AfterViewInit {

  #router = inject(Router);

  private _bottomSheet = inject(MatBottomSheet);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  #rest = inject(PPIProyectoUsecaseService);
  #authService = inject(AuthService);
  #loadingService = inject(LoaderService);
  #dialog = inject(MatDialog);

  search = signal<string>('');
  data = signal<PPIProyectoDTO[]>([]);
  length = signal<number>(0);
  pageSize = signal<number>(5);
  pageIndex = signal<number>(0);
  pageSizeOptions = AppConfigConstants.PAGE_SIZES_PAGINATOR;
  //displayedColumns: string[] = ['nombreProyecto', 'entidad', 'categoria', 'estudiosDisenio', 'porcentajeEjecutado', 'valorTotalContratos', 'actions']; //'modo', 'valorTotalEjecutado',
  displayedColumns: string[] = ['codCorredor', 'nombreLargo', 'nombreCorto', 'entidad', 'contratos', 'actions'];
  idEntity: string = '';

  ngAfterViewInit(): void {
    const interval = setInterval(() => {
      this.idEntity = this.#authService.getEntityId;
  
      if (this.idEntity) {
        console.log('idEntity obtenido:', this.idEntity);
        clearInterval(interval); // Detenemos el intervalo cuando se obtiene el valor
        this.getData(); // Llamamos a getData() cuando idEntity tiene un valor
      } else {
        console.warn('idEntity sigue vacío. Intentando nuevamente...');
      }
    }, 100); // Verifica cada 1 segundo
  }

  changeSearch(value: string) {
    this.search.set(value);
    this.paginator.firstPage();
    this.getData();
  }

  handlePageEvent(e: PageEvent) {
    this.length.set(e.length);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    this.getData();
  }

  getData() {
    this.#loadingService.show();
    console.log('id ' + this.idEntity);
    this.#rest!.getAllByEntity(this.idEntity, this.search(), this.pageIndex() + 1, this.pageSize()).subscribe({
      next: (res: ResponseListDTO) => {
        this.#loadingService.hide();
        const dataList = <PPIProyectoDTO[]><unknown>res.data.data;        
        this.data.set(dataList);
        this.length.set(res.data.total);
      }
    });
  }

  validateCantContracts(model: PPIProyectoDTO) {
    if (model.tieneContratos) return;
    this.#dialog.open(ObservationComponent, { width: '400px', data: model.tieneContratosObservacion }).afterClosed().subscribe(res => {
      if (!res) return;
      model.tieneContratosObservacion = res.observa;
      this.#rest.update(model.idProyecto, model).subscribe({
        next: (res) => this.getData()
      });      
    });
  }
  
  showObservation(model: PPIProyectoDTO): void {
    this._bottomSheet.open(BottomSheetObservationSheet, { data: model.tieneContratosObservacion });
  }

}

@Component({
  selector: 'bottom-sheet-observation-sheet',
  template: `<p>{{data}}</p>`,
  standalone: true,
  imports: [MatCardModule],
})
export class BottomSheetObservationSheet {
  private _bottomSheetRef = inject<MatBottomSheetRef<BottomSheetObservationSheet>>(MatBottomSheetRef);
  
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data:string
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
