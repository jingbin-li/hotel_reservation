import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from '../../common/models/reservation.model';
import { ReservationDto } from './dtos/reservation.dto';
import { GuestService } from './guest.service';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from '@/common/gql-auth-guard/role-guerd';
import { UseGuards } from '@nestjs/common';
import { Roles } from '@/common/decorators/role.decortator';

@Resolver()
@UseGuards(RolesGuard)
export class GuestResolver {
  constructor(
    private guestSvc: GuestService,
    private jwtService: JwtService,
  ) {}
  @Mutation(() => Reservation)
  @Roles('guest')
  async createRes(
    @Args('reservationDto') reservationDto: ReservationDto,
    @Context() ctx: any,
  ) {
    const { sub, username, role } = ctx.user;

    return this.guestSvc.createRes(reservationDto, {
      username,
      user_id: sub,
      role,
    });
  }
  @Mutation(() => Boolean)
  @Roles('guest')
  async updateRes(
    @Args('id', { nullable: true }) id: string,
    @Args('reservationDto') reservationDto: ReservationDto,
  ) {
    return this.guestSvc.updateRes(id, reservationDto);
  }

  @Mutation(() => Boolean)
  @Roles('guest')
  async deleteRes(@Args('id') id: string) {
    return this.guestSvc.deleteRes(id);
  }

  @Query(() => Reservation, { nullable: true })
  @Roles('guest')
  async getRes(@Context() context: any) {
    const userId = this.getUserId(context);
    const x = await this.guestSvc.getRes(userId);

    return x;
  }

  private getUserId(context) {
    return context?.user?.sub;
  }
}
