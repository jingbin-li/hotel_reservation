import { InternalServerErrorException } from '@nestjs/common';

class InvalidPhoneNumber extends InternalServerErrorException {
  constructor() {
    super('The phone number is already in use');
  }
}

export const INVALID_PHONE_NUMBER = new InvalidPhoneNumber();
