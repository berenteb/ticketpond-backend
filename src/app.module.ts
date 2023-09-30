import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { ExperienceModule } from './experience/experience.module';
import { MerchantModule } from './merchant/merchant.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [ExperienceModule, TicketModule, MerchantModule, CustomerModule, PaymentModule, OrderModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
