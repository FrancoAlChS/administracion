import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Enviroment } from '../constants';

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

	public static async sendEmail(
		emailData: {
			subject: string;
			message: string;
			toEmail: string;
			from: string;
		},
		senderData: { email: string; key: string }
	) {
		const transporter = Email.config(senderData.email, senderData.key);
		return transporter.sendMail({
			from: emailData.from,
			to: emailData.toEmail,
			subject: emailData.subject,
			html: emailData.message,
		});
	}
}
