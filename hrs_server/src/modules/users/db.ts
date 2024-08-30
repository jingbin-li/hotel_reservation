import { User } from '@/common/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInfo } from './dtos/userInfo.dto';
import { Cat } from '@/common/schemas/cat.schema';
interface DeleteResult {
  acknowledged: boolean;
  deletedCount: number;
}

@Injectable()
export class UsersDB {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Cat.name) private catModel: Model<Cat>,
  ) {}

  async createUser(userInfo: UserInfo) {
    const createdUser = new this.userModel(userInfo);

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByRole(role: 'employee' | 'guest') {
    return this.userModel.find({ role }, { password: 0 });
  }

  async findByPhoneAndPwd(phoneNumber: string, password: string) {
    return this.userModel.find({ phoneNumber, password });
  }

  async findByPhoneNum(phoneNumber: string) {
    return this.userModel.find({ phoneNumber });
  }

  async removeUsers(ids: string[]): Promise<DeleteResult> {
    return this.userModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }
}
