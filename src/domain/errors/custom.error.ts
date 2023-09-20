export class CustomError extends Error {
	constructor(public readonly code: number, public readonly message: string) {
		super(message);
	}

	static badRequest(message: string) {
		return new CustomError(400, message);
	}

	static unauthorized(message: string) {
		return new CustomError(401, message);
	}

	static notFound(message: string) {
		return new CustomError(404, message);
	}

	static internalServer(message: string = 'Error interno del servidor') {
		return new CustomError(500, message);
	}
}
