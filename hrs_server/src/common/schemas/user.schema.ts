import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  role: 'guest' | 'employee';

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
