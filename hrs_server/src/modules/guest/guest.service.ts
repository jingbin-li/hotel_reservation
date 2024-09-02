import { Injectable } from '@nestjs/common';
import { GuestDB } from './db';
import { ReservationDto } from './dtos/reservation.dto';

@Injectable()
export class GuestService {
  constructor(private db: GuestDB) {}
  async createRes(
    res: ReservationDto,
    userInfo: { user_id: string; username: string; role: 'employee' | 'guest' },
  ) {
    const raw = await this.getRes(userInfo.user_id);
    const toSaved = {
      ...res,
      user_id: userInfo.user_id,
      user_name: userInfo.username,
      role: userInfo.role,
    };

    if (!raw) {
      return this.db.create(toSaved);
    }

    const acknowledged = await this.updateRes(raw._id.toString(), toSaved);

    if (!acknowledged) {
      throw new Error('INTERNAL_SERVER_ERROR');
    }

    return { ...res, _id: raw._id, user_id: toSaved.user_id };
  }

  async updateRes(id: string, res: ReservationDto) {
    const result = await this.db.update(id, res);

    return result.acknowledged;
  }

  async deleteRes(id: string) {
    const result = await this.db.delete(id);

    return result.acknowledged;
  }

  async getRes(id: string) {
    const result = await this.db.findByUserId(id);

    return result;
  }
}
