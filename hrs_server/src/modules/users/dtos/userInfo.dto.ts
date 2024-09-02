import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInfo {
  @Field()
  name: string;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: false })
  phoneNumber: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  role: 'employee' | 'guest';
}
