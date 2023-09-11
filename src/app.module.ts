import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { TicketModule } from './ticket/ticket.module';
import { MerchantModule } from './merchant/merchant.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [ExperienceModule, TicketModule, MerchantModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
