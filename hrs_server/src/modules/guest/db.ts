import { User } from '@/common/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class GuestDB {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async getUsers(): Promise<User[]> {
    return this.UserModel.find().exec();
  }
}
