import { Injectable } from '@nestjs/common';
import { GuestDB } from './db';
import { ReservationDto } from './dtos/reservation.dto';

@Injectable()
export class GuestService {
  constructor(private db: GuestDB) {}
  async createRes(res: ReservationDto) {
    const raw = await this.getRes(res.user_id);
    console.log(raw);
    if (!raw) {
      return this.db.create(res);
    }

    const acknowledged = await this.updateRes(raw._id.toString(), res);
    if (!acknowledged) {
      throw new Error('INTERNAL_SERVER_ERROR');
    }

    return raw;
  }

  async updateRes(id: string, res: ReservationDto) {
    const result = await this.db.update(id, res);

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
