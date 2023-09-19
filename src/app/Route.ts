import { Router } from 'express';
import { Controller } from './Controller';

export abstract class Route<T extends Controller> {
	public router: Router;
	protected readonly controller: T;

	constructor(controller: { new (): T }) {
		this.controller = new controller();
		this.router = Router();
		this.routes();
	}

	protected abstract routes(): void;
}
