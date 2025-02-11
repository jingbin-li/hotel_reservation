import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { UseGuards } from '@nestjs/common';
import { Reservation } from '@/common/models/reservation.model';
import { Roles } from '@/common/decorators/role.decortator';
import { RolesGuard } from '@/common/gql-auth-guard/role-guerd';
import { ReservationDto } from '../guest/dtos/reservation.dto';

@Resolver()
@UseGuards(RolesGuard)
export class EmployeeResolver {
  constructor(private empSvc: EmployeeService) {}
  @Query(() => [Reservation])
  @Roles('employee')
  getAllRes() {
    return this.empSvc.getAllRes();
  }

  @Mutation(() => Boolean)
  @Roles('employee')
  async updateRes(
    @Args('id', { nullable: true }) id: string,
    @Args('reservationDto') reservationDto: ReservationDto,
  ) {
    return this.empSvc.updateRes(id, reservationDto);
  }
}
