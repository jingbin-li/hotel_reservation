import { Injectable } from '@nestjs/common';
import { Auth } from './models/auth.model';
export type User = any;

@Injectable()
export class AuthService {
  async generateToken(id): Promise<Auth> {
    console.log(id);
    return {
      token: '123132',
    };
  }
}
