import nodemailer from 'nodemailer';
import { Enviroment } from '../constants';

export class Email {
	private static config(email: string, pass: string) {
		return nodemailer.createTransport({
			port: Enviroment.EMAIL_PORT,
			host: Enviroment.EMAIL_HOST,
			secure: true,
			auth: {
				user: email,
				pass: pass,
			},
		});
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
		return await transporter.sendMail({
			from: emailData.from,
			to: emailData.toEmail,
			subject: emailData.subject,
			html: emailData.message,
		});
	}
}
