import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  phoneNumber: string;
  @Field()
  password: string;
}
