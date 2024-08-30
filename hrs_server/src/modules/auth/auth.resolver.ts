import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/common/decorators/no-auth.decorator';
import { UserInfo } from '../users/dtos/userInfo.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { Auth } from './models/Auth.model';
import { HttpException, HttpStatus, UseFilters } from '@nestjs/common';

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
    try {
      return this.authSvc.signIn(loginData.phoneNumber, loginData.password);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Public()
  @Mutation(() => Auth)
  async createAccount(@Args('userInfo') userInfo: UserInfo) {
    return this.authSvc.createAccount(userInfo);
  }
}
