import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ReservationDto {
  @Field({ nullable: true })
  id: string;

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

  @Field()
  specReq: string;
}
