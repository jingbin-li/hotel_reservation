import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  GqlExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { LoginDto } from './dtos/login.dto';
import { Public } from 'src/common/decorators/no-auth.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authSvc: AuthService) {}

  @Query((returns) => String)
  async testQuery() {
    return '';
  }

  @Public()
  @Mutation(() => Auth)
  async login(@Args('loginData') loginData: LoginDto) {
    const signInData = { username: 'john', password: 'changeme' };
    return this.authSvc.signIn(signInData.username, signInData.password);
  }
}
