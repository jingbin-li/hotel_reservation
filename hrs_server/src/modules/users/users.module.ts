import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/common/schemas/user.schema';
import { UsersDB } from './db';
import { Cat, CatSchema } from '@/common/schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Cat.name, schema: CatSchema },
    ]),
  ],
  providers: [UsersService, UsersDB],
  exports: [UsersService],
})
export class UsersModule {}
