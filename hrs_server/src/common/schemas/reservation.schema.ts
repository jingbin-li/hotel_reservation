import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RESERVATION_STATUS } from '../enums/status';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop()
  user_id: string;

  @Prop()
  user_name: string;

  @Prop()
  contactName: string;

  @Prop()
  contactNumber: string;

  @Prop()
  resDate: string;

  @Prop()
  resTime: string;

  @Prop()
  guestNum: number;

  @Prop()
  specReq: string;

  @Prop()
  role: string;

  @Prop()
  reservationStatus: RESERVATION_STATUS;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
