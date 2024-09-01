import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestDB } from './db';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestResolver } from './guest.resolver';
import {
  Reservation,
  ReservationSchema,
} from '@/common/schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [GuestService, GuestDB, GuestResolver],
})
export class GuestModule {}
