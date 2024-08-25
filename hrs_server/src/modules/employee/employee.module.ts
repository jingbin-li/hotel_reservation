import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Module({
  providers: [EmployeeService],
  controllers: [],
})
export class EmployeeModule {}
