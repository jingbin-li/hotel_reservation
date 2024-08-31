import { HttpException, HttpStatus } from '@nestjs/common';

class InvalidUserException extends HttpException {
  constructor() {
    super('INVALID_ACCOUNT', HttpStatus.FORBIDDEN);
  }
}

export const INVALID_USER_EXCEPTION = new InvalidUserException();
