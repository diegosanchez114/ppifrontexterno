//Gateways
import { PPIAvanceGateway } from '../../domain/gateways/ppi/ppi-avance-gateway';
import { PPIContratoGateway } from '../../domain/gateways/ppi/ppi-contrato-gateway';
import { PPIProyectoGateway } from '../../domain/gateways/ppi/ppi-proyecto-gateway';
import { PPIAlertsGateway } from '../../domain/gateways/ppi/ppi-alerts-gateway';
import { PPINecesidadInversionGateway } from '../../domain/gateways/ppi/ppi-necesidad-inversion-gateway';

//Repositories
import { PPIProyectoServiceImpl } from '../../infraestructure/driven-adapters/ppi/ppi-proyecto-impl.service';
import { PPIAvanceServiceImpl } from '../../infraestructure/driven-adapters/ppi/ppi-avance-impl.service';
import { PPIContratoServiceImpl } from '../../infraestructure/driven-adapters/ppi/ppi-contrato-impl.service';
import { PPINovedadGateway } from '../../domain/gateways/ppi/ppi-novedad-gateway';
import { PPINovedadServiceImpl } from '../../infraestructure/driven-adapters/ppi/ppi-novedad-impl.service';
import { PPIAlertsServiceImpl } from '../../infraestructure/driven-adapters/ppi/ppi-alerts-impl.service';
import { PPINecesidadInversionImpl } from '../../infraestructure/driven-adapters/ppi/ppi-necesidad-inversion-impl.service';


//Dependency Injection (DI)
export const API_GATEWAYS_PROVIDERS_PPI_PROYECTO_DI = [
  { provide: PPIProyectoGateway, useClass: PPIProyectoServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PPI_CONTRATO_DI = [
  { provide: PPIContratoGateway, useClass: PPIContratoServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PPI_AVANCE_DI = [
  { provide: PPIAvanceGateway, useClass: PPIAvanceServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PPI_NOVEDAD_DI = [
  { provide: PPINovedadGateway, useClass: PPINovedadServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PPI_ALERTS_DI = [
  { provide: PPIAlertsGateway, useClass: PPIAlertsServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PPI_NECESIDAD_INVERSION_DI = [
  { provide: PPINecesidadInversionGateway, useClass: PPINecesidadInversionImpl }
];
