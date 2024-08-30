import { Injectable } from '@nestjs/common';
import { GuestDB } from './db';
import { GuestModel } from './models/guest.model';

@Injectable()
export class GuestService {
  constructor(private db: GuestDB) {}
  async getUsers(): Promise<GuestModel[]> {
    return this.db.getUsers();
  }
}
