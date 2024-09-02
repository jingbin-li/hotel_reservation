import { Injectable } from '@nestjs/common';
import { EmployeeDB } from './db';

@Injectable()
export class EmployeeService {
  constructor(private db: EmployeeDB) {}

  async getAllRes() {
    const res = await this.db.getReservations();
  }
}
