import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import { Document, Types } from 'mongoose'
import { Message } from "./message.schema";

@Schema()
export class Notification {
    
    @Transform(({ value }) => value.toString()) // To manage type ID to type string
    _id: string;

    @Prop({type: [Types.ObjectId], ref: Message.name, default: []})
    messages: Message[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);