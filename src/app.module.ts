import { Module } from '@nestjs/common';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { ExperienceModule } from './experience/experience.module';
import { MerchantModule } from './merchant/merchant.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { TicketModule } from './ticket/ticket.module';
import { PassModule } from './pass/pass.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ExperienceModule,
    TicketModule,
    MerchantModule,
    CustomerModule,
    PaymentModule,
    OrderModule,
    CartModule,
    AuthzModule,
    PassModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', '..', 'static'),
      serveRoot: '/cdn',
      serveStaticOptions: {
        index: false,
        redirect: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
