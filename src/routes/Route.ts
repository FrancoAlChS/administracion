import { Controller, Route } from '../app';
import { AdministratorRoute } from './Administrator.route';
import { DriverRoute } from './Driver.route';

export const Routes: Route<Controller>[] = [new AdministratorRoute(), new DriverRoute()];
