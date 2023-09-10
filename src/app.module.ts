import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperienceModule } from './experience/experience.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [ExperienceModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
