import { CustomError } from '../../errors';
import { ValueObject } from '../value-object';

interface AgentProps {
	name: string;
	DNI: string | null;
}

export class ReportAgent extends ValueObject<AgentProps> {
	constructor(value: AgentProps) {
		super(value);
	}

	protected validate(): void {
		if (this.value.name === '' || this.value.name === undefined) {
			throw CustomError.badRequest('El nombre del agente no puede estar vacio');
		}
	}

	public getValue(): AgentProps {
		return this.value;
	}
}
