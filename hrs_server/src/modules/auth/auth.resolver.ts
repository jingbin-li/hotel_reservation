import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private authSvc: AuthService) {}

  @Query((returns) => Auth)
  async generateToken() {
    const id = 1;
    return this.authSvc.generateToken(id);
  }
}
