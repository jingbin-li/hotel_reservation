import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  id: string;
  @Field(() => String)
  username: string;
  @Field()
  access_token: string;
  @Field()
  phoneNumber: string;
  @Field()
  role: 'guest' | 'employee';
}
