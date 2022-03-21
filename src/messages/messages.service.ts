import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/schemas/message.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {

    constructor( @InjectModel(Message.name) private readonly messageModel: Model<Message> ) {}

    public async createMsg( createMessageDto: CreateMessageDto ): Promise<Message> {
        const newMsg = new this.messageModel(createMessageDto);
        return await newMsg.save();
    };
};