import { cryptoConstants, jwtConstants } from '@/common/constants/constants';
import { INVALID_USER_EXCEPTION } from '@/common/exceptions/InvalidUser.exception';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UserInfo } from '../users/dtos/userInfo.dto';
import { UsersService } from '../users/users.service';
import { INVALID_PHONE_NUMBER } from '@/common/exceptions/InvalidPhoneNumber.exception';
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
      access_token: this.generateToken(
        userAccount.username,
        userAccount.id,
        userAccount.role,
      ),
    };
  }

  async createAccount(userData: UserInfo) {
    const encryptedText = await this.cryptoAccount(userData.password);
    const phoneNumber = await this.usersService.findByPhoneNumber(
      userData.phoneNumber,
    );

    if (phoneNumber.length !== 0) {
      throw INVALID_PHONE_NUMBER;
    }

    const account = await this.usersService.createUser({
      ...userData,
      password: encryptedText,
    });

    const access_token = await this.generateToken(
      account.name,
      account._id.toString(),
      account.role,
    );

    return {
      id: account._id.toString(),
      username: account.name,
      access_token,
      role: account.role,
    };
  }

  public async getPayload(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    return payload;
  }

  private async cryptoAccount(pwd: string) {
    const hamc = createHmac('sha256', cryptoConstants.secret);
    hamc.update(pwd);

    return hamc.digest('hex');
  }

  private async generateToken(
    username: string,
    userId: string,
    role: 'guest' | 'employee',
  ) {
    const payload = { sub: userId, username, role };

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
      role: userAccount.role,
    };
  }
}
