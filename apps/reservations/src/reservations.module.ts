import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { DatabaseModule } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument, ReservationSchema } from './models/reservation.model';
import { LoggerModule } from '@app/common/logger/logger.module';


@Module({
  imports: [
    DatabaseModule, 
    DatabaseModule.forFeature([
      {
        name: ReservationDocument.name, schema: ReservationSchema
      }
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
