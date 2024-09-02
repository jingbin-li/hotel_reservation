import { Injectable } from '@nestjs/common';
import { GuestDB } from './db';
import { ReservationDto } from './dtos/reservation.dto';

@Injectable()
export class GuestService {
  constructor(private db: GuestDB) {}
  async createRes(res: ReservationDto, userId: string) {
    const raw = await this.getRes(userId);
    console.log(raw);
    if (!raw) {
      return this.db.create({ ...res, user_id: userId });
    }

    console.log('=======>', userId);
    const acknowledged = await this.updateRes(raw._id.toString(), {
      ...res,
      user_id: userId,
    });
    if (!acknowledged) {
      throw new Error('INTERNAL_SERVER_ERROR');
    }

    return { ...res, _id: raw._id };
  }

  async updateRes(id: string, res: ReservationDto) {
    const result = await this.db.update(id, res);

    console.log('00000000', result);

    return result.acknowledged;
  }

  async deleteRes(id: string) {
    const result = await this.db.delete(id);

    console.log(result);

    return result.acknowledged;
  }

  async getRes(id: string) {
    const result = await this.db.findByUserId(id);
    console.log(result);

    return result;
  }
}
