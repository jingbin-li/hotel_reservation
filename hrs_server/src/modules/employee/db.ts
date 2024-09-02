import { Reservation } from '@/common/schemas/reservation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDeleteResult } from '@/common/interface/delete-result';
@Injectable()
export class EmployeeDB {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async getReservations() {
    const res = await this.reservationModel.find();
    console.log(res);

    return res;
  }
}
