import { Injectable } from '@nestjs/common';
import { EmployeeDB } from './db';
import { ReservationDto } from '../guest/dtos/reservation.dto';

@Injectable()
export class EmployeeService {
  constructor(private db: EmployeeDB) {}

  async getAllRes() {
    const res = await this.db.getReservations();
    if (!res) {
      return [];
    }

    return res;
  }

  async updateRes(id: string, body: ReservationDto) {
    const result = await this.db.updateReservations(id, body);

    return result.acknowledged;
  }
}
