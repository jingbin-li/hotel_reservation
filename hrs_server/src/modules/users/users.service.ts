import { Injectable } from '@nestjs/common';
import { UsersDB } from './db';
import { UserInfo } from './dtos/userInfo.dto';
export type User = any;

@Injectable()
export class UsersService {
  constructor(private db: UsersDB) {}

  async findByPhoneAndPwd(phoneNumber: string, pwd: string) {
    return this.db.findByPhoneAndPwd(phoneNumber, pwd);
  }

  async createUser(userInfo: UserInfo) {
    return this.db.createUser(userInfo);
  }
}
