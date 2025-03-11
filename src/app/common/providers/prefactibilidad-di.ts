//Gateways
import { PreAvanceGateway } from '../../domain/gateways/prefactibilidad/pre-avance-gateway';
import { PreProyectoGateway } from '../../domain/gateways/prefactibilidad/pre-proyecto-gateway';
import { PreTipoAvanceGateway } from '../../domain/gateways/prefactibilidad/pre-tipo-avance-gateway';

//Repositories
import { PreAvanceServiceImpl } from '../../infraestructure/driven-adapters/prefactibilidad/pre-avance-impl.service';
import { PreProyectoServiceImpl } from '../../infraestructure/driven-adapters/prefactibilidad/pre-proyecto-impl.service';
import { PreTipoAvanceServiceImpl } from '../../infraestructure/driven-adapters/prefactibilidad/pre-tipo-avance-impl.service';

//Dependency Injection (DI)
export const API_GATEWAYS_PROVIDERS_PRE_TIPO_AVANCE_DI = [
  { provide: PreTipoAvanceGateway, useClass: PreTipoAvanceServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PRE_PROYECTO_DI = [
  { provide: PreProyectoGateway, useClass: PreProyectoServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PRE_AVANCE_DI = [
  { provide: PreAvanceGateway, useClass: PreAvanceServiceImpl }
];

