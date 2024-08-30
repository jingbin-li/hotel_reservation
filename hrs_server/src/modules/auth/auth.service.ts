import { cryptoConstants } from '@/common/constants/constants';
import { INVALID_USER_EXCEPTION } from '@/common/exceptions/invalidUser.exception';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UserInfo } from '../users/dtos/userInfo.dto';
import { UsersService } from '../users/users.service';
export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(phoneNumber: string, pass: string) {
    const userAccount = await this.checkAccount(phoneNumber, pass);

    if (!userAccount) {
      throw INVALID_USER_EXCEPTION;
    }

    return {
      ...userAccount,
      access_token: this.generateToken(userAccount.username, userAccount.id),
    };
  }

  async createAccount(userData: UserInfo) {
    const encryptedText = await this.cryptoAccount(userData.password);

    const account = await this.usersService.createUser({
      ...userData,
      password: encryptedText,
    });

    const access_token = await this.generateToken(
      account.name,
      account._id.toString(),
    );

    return { id: account._id.toString(), username: account.name, access_token };
  }

  private async cryptoAccount(pwd: string) {
    const hamc = createHmac('sha256', cryptoConstants.secret);
    hamc.update(pwd);

    return hamc.digest('hex');
  }

  private async generateToken(username: string, userId: string) {
    const payload = { sub: userId, username };

    return this.jwtService.signAsync(payload);
  }

  private async checkAccount(phoneNumber: string, pwd: string) {
    const encrypted = await this.cryptoAccount(pwd);
    const res = await this.usersService.findByPhoneAndPwd(
      phoneNumber,
      encrypted,
    );

    if (res.length === 0) {
      return null;
    }

    const userAccount = res[0];

    return {
      id: userAccount._id.toString(),
      username: userAccount.name,
      phoneNumber: userAccount.phoneNumber,
    };
  }
}
