import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import { OrderDto } from '../types/dtos/order.dto';
import { PaymentDto } from '../types/dtos/payment.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';
import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_ENDPOINT_SECRET } from '../util/configuration.util';

@Injectable()
export class PaymentService implements PaymentServiceInterface {
  constructor(private readonly orderService: OrderServiceInterface) {}

  private stripe = new Stripe(STRIPE_SECRET_KEY, { typescript: true, apiVersion: '2023-10-16' });

  async createIntent(order: OrderDto): Promise<PaymentDto> {
    const amount = order.items.reduce((acc, item) => acc + item.price, 0);
    Logger.debug(`Created intent for order with id ${order.id} and ${amount} HUF`, PaymentService.name);
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'huf',
      payment_method_types: ['card'],
      metadata: { orderId: order.id },
    });
    return { clientSecret: paymentIntent.client_secret };
  }

  async handleWebhook(req: Request, body: any): Promise<void> {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_ENDPOINT_SECRET);
    } catch (e) {
      Logger.error(e, PaymentService.name);
      throw new BadRequestException();
    }
    Logger.debug(`Received event of type ${event.type}`, PaymentService.name);
    switch (event.type) {
      case 'charge.succeeded':
        const succeededOrderId = event.data.object.metadata.orderId;
        await this.orderService.fulfillOrder(succeededOrderId);
        break;
      case 'charge.failed':
        const failedOrderId = event.data.object.metadata.orderId;
        await this.orderService.failOrder(failedOrderId);
        break;
    }
    return;
  }
}
