import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { NotificationServiceInterface } from '../types/service-interfaces/notification.service.interface';
import { EMAIL_FROM, EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD, EMAIL_PORT } from '../util/configuration.util';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: EMAIL_PORT === 465,
        auth: {
          user: EMAIL_USERNAME,
          pass: EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: EMAIL_FROM,
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [{ provide: NotificationServiceInterface, useClass: NotificationService }],
  exports: [{ provide: NotificationServiceInterface, useClass: NotificationService }],
})
export class NotificationModule {}
