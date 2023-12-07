import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { DeepOrderWithCustomerDto } from '../types/dtos/order.dto';
import { NotificationServiceInterface } from '../types/service-interfaces/notification.service.interface';
import { BACKEND_URL, CDN_URL } from '../util/configuration.util';

@Injectable()
export class NotificationService implements NotificationServiceInterface {
  constructor(private readonly mailerService: MailerService) {}

  sendOrderSuccess(order: DeepOrderWithCustomerDto): void {
    const items: EmailOrderItem[] = order.items.map((item) => ({
      name: `${item.ticket.experience.name} - ${item.ticket.name}`,
      price: item.ticket.price,
      walletUrl: `${CDN_URL}/passes/apple/${item.id}.pkpass`,
      qrCodeUrl: `${BACKEND_URL}/pass/qr/${item.serialNumber}`,
    }));
    this.mailerService
      .sendMail({
        to: order.customer.email,
        subject: 'Sikeres jegyvásárlás 🎉',
        template: 'order-success',
        context: {
          firstName: order.customer.firstName,
          items,
        },
      })
      .then(() => {
        Logger.debug(`Sent order success email to ${order.customer.email}`, NotificationService.name);
      })
      .catch((error) => {
        Logger.error(error, NotificationService.name);
      });
  }

  sendWelcome(customer: Customer): void {
    this.mailerService
      .sendMail({
        to: customer.email,
        subject: 'Üdv a Ticketpond-on 👋',
        template: 'welcome',
        context: {
          firstName: customer.firstName,
        },
      })
      .then(() => {
        Logger.debug(`Sent welcome email to ${customer.email}`, NotificationService.name);
      })
      .catch((error) => {
        Logger.error(error, NotificationService.name);
      });
  }
}

type EmailOrderItem = {
  name: string;
  price: number;
  walletUrl: string;
  qrCodeUrl: string;
};
