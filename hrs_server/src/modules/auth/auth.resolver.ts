import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { LoginDto } from './dtos/login.dto';
import { LoginModel } from './models/login.model';

@Resolver()
export class AuthResolver {
  constructor(private authSvc: AuthService) {}

  @Query((returns) => String)
  async generateToken() {
    return '';
  }

  @Mutation(() => Auth)
  async login(@Args('loginData') loginData: LoginDto) {
    const signInData = { username: 'john', password: 'changeme' };
    return this.authSvc.signIn(signInData.username, signInData.password);
  }
}
