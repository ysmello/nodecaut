import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '@shared/Container/providers/MailProvider/models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Sender Name <sender@example.com>',
      to,
      subject: 'teste',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log(
      'Preview URL: %s',
      nodemailer.getTestMessageUrl(message),
    );
  }
}
