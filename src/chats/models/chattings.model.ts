import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions, Types, Document } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Socket as SocketModel } from './sockets.model';

const options: SchemaOptions = {
  id: false,
  collection: 'chattings',
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String },
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  user: SocketModel;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
