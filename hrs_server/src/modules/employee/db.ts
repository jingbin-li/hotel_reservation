import { Reservation } from '@/common/schemas/reservation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from '../guest/dtos/reservation.dto';
@Injectable()
export class EmployeeDB {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async getReservations() {
    return this.reservationModel.find();
  }

  async updateReservations(id: string, body: Partial<ReservationDto>) {
    return this.reservationModel.updateOne({ _id: id || null }, { $set: body });
  }
}
