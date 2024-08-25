import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './models/auth.model';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export type User = any;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log(user, pass);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
