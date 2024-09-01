import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './models/reservation.model';
import { ReservationDto } from './dtos/reservation.dto';
import { GuestService } from './guest.service';
import { Public } from '@/common/decorators/no-auth.decorator';

@Public()
@Resolver()
export class GuestResolver {
  constructor(private guestSvc: GuestService) {}
  @Mutation(() => Reservation)
  async createRes(@Args('reservationDto') reservationDto: ReservationDto) {
    return this.guestSvc.createRes(reservationDto);
  }
  @Mutation(() => Boolean)
  async updateRes(
    @Args('id', { nullable: true }) id: string,
    @Args('reservationDto') reservationDto: ReservationDto,
  ) {
    return this.guestSvc.updateRes(id, reservationDto);
  }

  @Mutation(() => Boolean)
  async deleteRes(@Args('string') id: string) {
    return this.guestSvc.deleteRes(id);
  }

  @Query(() => Reservation)
  async getRes(@Args('string') id: string) {
    return this.guestSvc.getRes(id);
  }
}
