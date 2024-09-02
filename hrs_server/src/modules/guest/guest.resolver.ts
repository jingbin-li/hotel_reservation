import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './models/reservation.model';
import { ReservationDto } from './dtos/reservation.dto';
import { GuestService } from './guest.service';
import { Public } from '@/common/decorators/no-auth.decorator';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class GuestResolver {
  constructor(
    private guestSvc: GuestService,
    private jwtService: JwtService,
  ) {}
  @Mutation(() => Reservation)
  async createRes(
    @Args('reservationDto') reservationDto: ReservationDto,
    @Context() ctx: any,
  ) {
    console.log('ctx=======>', ctx.user);
    const { sub, username } = ctx.user;

    return this.guestSvc.createRes(reservationDto, { username, user_id: sub });
  }
  @Mutation(() => Boolean)
  async updateRes(
    @Args('id', { nullable: true }) id: string,
    @Args('reservationDto') reservationDto: ReservationDto,
  ) {
    return this.guestSvc.updateRes(id, reservationDto);
  }

  @Mutation(() => Boolean)
  async deleteRes(@Args('id') id: string) {
    return this.guestSvc.deleteRes(id);
  }

  @Query(() => Reservation)
  async getRes(@Context() context: any) {
    const userId = this.getUserId(context);
    return this.guestSvc.getRes(userId);
  }

  private getUserId(context) {
    return context?.user?.sub;
  }
}
