import { Resolver } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';

@Resolver()
export class EmployeeResolver {
  constructor(private empSvc: EmployeeService) {}
}
