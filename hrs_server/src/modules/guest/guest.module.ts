import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestDB } from './db';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/common/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [GuestService, GuestDB],
})
export class GuestModule {}
