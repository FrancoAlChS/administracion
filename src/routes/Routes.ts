import { Route } from '../app';
import { AdministratorRoute } from './administrator.route';
import { DriverRoute } from './driver.route';

export const Routes: Route[] = [new AdministratorRoute(), new DriverRoute()];
