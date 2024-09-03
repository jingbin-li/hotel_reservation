import { Roles } from '@/common/decorators/role.decortator';
import { Controller, Get, Request } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Public } from '@/common/decorators/no-auth.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private empSvc: EmployeeService) {}
  @Get('/reservations')
  @Roles('employee')
  async getAllRes(@Request() req) {
    return await this.empSvc.getAllRes();
  }
}
