import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';

@Module({
  controllers: [],
  providers: [GuestService],
})
export class GuestModule {}
