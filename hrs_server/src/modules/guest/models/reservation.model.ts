import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: false })
  user_id: string;

  @Field()
  contactName: string;

  @Field()
  contactNumber: string;

  @Field()
  resDate: string;

  @Field()
  resTime: string;

  @Field()
  guestNum: number;

  @Field({ nullable: true })
  specReq: string;
}
