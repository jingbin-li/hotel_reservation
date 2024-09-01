import { Reservation } from '@/common/schemas/reservation.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from './dtos/reservation.dto';
import { IDeleteResult } from '@/common/interface/delete-result';
@Injectable()
export class GuestDB {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}
  createReservation() {}

  create(res: ReservationDto) {
    const createRes = new this.reservationModel(res);

    return createRes.save();
  }

  update(id: string, res: ReservationDto) {
    return this.reservationModel.updateOne({ _id: id }, { $set: res });
  }

  delete(id: string): Promise<IDeleteResult> {
    return this.reservationModel.deleteOne({ _id: id });
  }

  findByUserId(id: string) {
    return this.reservationModel.findOne({ user_id: id });
  }
}
