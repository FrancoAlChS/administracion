import { Route } from '../app';
import { AdministratorRoute } from './Administrator.route';
import { DriverRoute } from './Driver.route';

export const Routes: Route[] = [new AdministratorRoute(), new DriverRoute()];
