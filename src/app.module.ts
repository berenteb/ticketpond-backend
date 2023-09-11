import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { TicketModule } from './ticket/ticket.module';
import { MerchantModule } from './merchant/merchant.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ExperienceModule, TicketModule, MerchantModule, CustomerModule, PaymentModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
