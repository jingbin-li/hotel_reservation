import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GuestModel {
  @Field()
  name: string;
}
