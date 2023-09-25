import { EmailFrom, EmailFromEmail, EmailMessage, EmailSubject, EmailToEmail } from '../value-objects';
import { Entity } from './Entity';

interface EmailProps {
	message: string;
	subject: string;
	toEmail: string;
	fromEmail: string;
	key: string;
}

export class EmailEntity extends Entity<EmailProps> {
	constructor(
		private message: EmailMessage,
		private subject: EmailSubject,
		private toEmail: EmailToEmail,
		private fromEmail: EmailFromEmail,
		private from: EmailFrom
	) {
		super();
	}

	public getValues(): EmailProps {
		return {
			fromEmail: this.fromEmail.getValue().email,
			key: this.fromEmail.getValue().key,
			toEmail: this.toEmail.getValue(),
			message: this.message.getValue(),
			subject: this.subject.getValue(),
		};
	}

	public getMessage() {
		return this.message.getValue();
	}

	public getSubject() {
		return this.subject.getValue();
	}

	public getToEmail() {
		return this.toEmail.getValue();
	}

	public getFromEmail() {
		return this.fromEmail.getValue().email;
	}

	public getFrom() {
		return this.from.getValue();
	}

	public getKeyEmail() {
		return this.fromEmail.getValue().key;
	}
}
