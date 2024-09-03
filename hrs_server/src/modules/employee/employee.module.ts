import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeDB } from './db';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Reservation,
  ReservationSchema,
} from '@/common/schemas/reservation.schema';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  providers: [EmployeeService, EmployeeResolver, EmployeeDB],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
