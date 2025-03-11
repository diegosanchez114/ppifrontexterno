//Gateways
import { EntidadGateway } from '../../domain/gateways/transversales/entidad-gateway';
import { ParametricaGateway } from '../../domain/gateways/transversales/parametrica-gateway';

//Repositories
import { EntidadServiceImpl } from '../../infraestructure/driven-adapters/transversales/entidad-impl.service';
import { ParametricaServiceImpl } from '../../infraestructure/driven-adapters/transversales/parametrica-impl.service';

//Dependency Injection (DI)
export const API_GATEWAYS_PROVIDERS_ENTIDAD_DI = [
  { provide: EntidadGateway, useClass: EntidadServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PARAMETRICA_DI = [
  { provide: ParametricaGateway, useClass: ParametricaServiceImpl }
];
