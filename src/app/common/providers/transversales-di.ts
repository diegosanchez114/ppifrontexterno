//Gateways
import { EntidadGateway } from '../../domain/gateways/transversales/entidad-gateway';
import { ParametricaGateway } from '../../domain/gateways/transversales/parametrica-gateway';
import { UsuarioGateway } from '../../domain/gateways/transversales/usuario-gateway';

//Repositories
import { EntidadServiceImpl } from '../../infraestructure/driven-adapters/transversales/entidad-impl.service';
import { ParametricaServiceImpl } from '../../infraestructure/driven-adapters/transversales/parametrica-impl.service';
import { UsuarioServiceImpl } from '../../infraestructure/driven-adapters/transversales/usuario-impl.service';

//Dependency Injection (DI)
export const API_GATEWAYS_PROVIDERS_ENTIDAD_DI = [
  { provide: EntidadGateway, useClass: EntidadServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_PARAMETRICA_DI = [
  { provide: ParametricaGateway, useClass: ParametricaServiceImpl }
];

export const API_GATEWAYS_PROVIDERS_USUARIO_DI = [
  { provide: UsuarioGateway, useClass: UsuarioServiceImpl }
];
