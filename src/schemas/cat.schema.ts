import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  RelayPaginateQueryHelper,
  RelayPaginateStatics,
} from 'mongoose-relay-paginate';

export type CatDocument = HydratedDocument<
  Cat,
  RelayPaginateStatics,
  RelayPaginateQueryHelper
>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
