import { Route } from '../app';
import { AdministratorRoute } from './administrator.route';
import { DailyServicesRoute } from './daily-services.route';
import { DriverRoute } from './driver.route';
import { MessageEmailRoute } from './message-email.route';

export const Routes: Route[] = [
	new AdministratorRoute(),
	new DriverRoute(),
	new DailyServicesRoute(),
	new MessageEmailRoute(),
];
