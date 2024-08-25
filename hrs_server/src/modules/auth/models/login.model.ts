import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field()
  userId: number;
  @Field(() => String)
  username: string;
}
