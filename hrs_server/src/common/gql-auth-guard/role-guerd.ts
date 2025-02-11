// roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log(roles)

    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext();

    if (!user || !roles.includes(user.role)) {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
