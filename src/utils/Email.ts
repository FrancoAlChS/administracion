import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Enviroment } from '../constants';
import { EmailEntity } from '../domain/entities';

export class Email {
	private static transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | undefined = undefined;

	private static config(email: string, pass: string) {
		if (Email.transporter === undefined) {
			Email.transporter = nodemailer.createTransport({
				port: Enviroment.EMAIL_PORT,
				host: Enviroment.EMAIL_HOST,
				secure: true,
				auth: {
					user: email,
					pass: pass,
				},
			});
		}

		return Email.transporter;
	}

	public static async sendEmail(email: EmailEntity) {
		const transporter = Email.config(email.getFromEmail(), email.getKeyEmail());
		return transporter.sendMail({
			from: email.getFrom(),
			to: email.getToEmail(),
			subject: email.getSubject(),
			html: email.getMessage(),
		});
	}
}
