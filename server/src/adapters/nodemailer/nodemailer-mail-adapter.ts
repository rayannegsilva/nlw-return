import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c74f34aebaa126",
    pass: "31e01554d178f7"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
    from: 'Equipe feedget <oi@email.com>',
    to: 'Rayanne Giló <rgilodasilva@gmail.com>',
    subject,
    html: body,
  });

  };
}