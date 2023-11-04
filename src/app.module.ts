import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssetModule } from './asset/asset.module';
import { AuthzModule } from './authz/authz.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { ExperienceModule } from './experience/experience.module';
import { MerchantModule } from './merchant/merchant.module';
import { OrderModule } from './order/order.module';
import { PassModule } from './pass/pass.module';
import { PaymentModule } from './payment/payment.module';
import { TicketModule } from './ticket/ticket.module';

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
    AssetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
