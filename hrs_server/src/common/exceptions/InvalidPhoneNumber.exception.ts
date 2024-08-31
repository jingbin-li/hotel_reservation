import { InternalServerErrorException } from '@nestjs/common';

class InvalidPhoneNumber extends InternalServerErrorException {
  constructor() {
    super('INVALID_PH_NUM');
  }
}

export const INVALID_PHONE_NUMBER = new InvalidPhoneNumber();
