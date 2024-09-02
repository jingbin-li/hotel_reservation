import { Query, Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import {} from '@nestjs/common';
import { Reservation } from '@/common/models/reservation.model';

@Resolver()
export class EmployeeResolver {
  constructor(private empSvc: EmployeeService) {}
  @Query(() => [Reservation])
  getAllRes() {
    return this.empSvc.getAllRes();
  }
}
