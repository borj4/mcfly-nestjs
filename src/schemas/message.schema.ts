import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
// import { Document, Types } from 'mongoose'

@Schema()
export class Message {
    
    @Transform(({ value }) => value.toString()) // To manage type ID to type string
    _id: string;

    @Prop()
    message: string;

    @Prop({ default: Date })
    sent: Date;

    @Prop()
    from: string;

    @Prop()
    to: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);