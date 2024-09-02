import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field({ nullable: true })
  _id: string = '';

  @Field({ nullable: true })
  user_id: string = '';

  @Field({ nullable: true })
  user_name: string = '';

  @Field()
  contactName: string = '';

  @Field()
  contactNumber: string = '';

  @Field()
  resDate: string = '';

  @Field()
  resTime: string = '';

  @Field()
  guestNum: number = 0;

  @Field({ nullable: true })
  specReq: string = '';
}
