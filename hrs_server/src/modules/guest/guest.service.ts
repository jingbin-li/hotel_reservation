import { Injectable } from '@nestjs/common';
import { GuestDB } from './db';
import { ReservationDto } from './dtos/reservation.dto';

@Injectable()
export class GuestService {
  constructor(private db: GuestDB) {}
  async createRes(res: ReservationDto) {
    return this.db.create(res);
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
