import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude, Transform } from "class-transformer";
import { Document, Types } from 'mongoose'; //to manage relations
import { Message } from "./message.schema";

@Schema()
export class User {
    
    @Transform(({ value }) => value.toString()) // To manage type ID to type string
    _id: string;

    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    @Exclude()
    password: string;

    @Prop({default: true})
    available: boolean;

    @Prop({type: [Types.ObjectId], ref: Message.name, default: []})
    messages: Message[];

    @Prop({type: Types.ObjectId, ref: Notification.name})
    notifications: Notification;
};

export const UserSchema = SchemaFactory.createForClass(User);