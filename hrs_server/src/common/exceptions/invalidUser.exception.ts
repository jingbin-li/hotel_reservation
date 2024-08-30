import { HttpException, HttpStatus } from '@nestjs/common';

class InvalidUserException extends HttpException {
  constructor() {
    super('Invalid account', HttpStatus.FORBIDDEN);
  }
}

export const INVALID_USER_EXCEPTION = new InvalidUserException();
