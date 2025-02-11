import { Roles } from '@/common/decorators/role.decortator';
import { RolesGuard } from '@/common/gql-auth-guard/role-guerd';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
@UseGuards(RolesGuard)
@Controller('api/reservations')
export class EmployeeController {
  constructor(private empSvc: EmployeeService) {}
  @Get()
  @Roles('employee')
  async getAllRes(@Request() req) {
    return await this.empSvc.getAllRes();
  }
}
