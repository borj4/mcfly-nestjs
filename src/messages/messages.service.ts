import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from 'src/schemas/message.schema';
import { User } from 'src/schemas/users.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {

    constructor( 
        @InjectModel(Message.name) private readonly messageModel: Model<Message>,
        private usersService: UsersService
    ) {}

    public async createMsg( createMessageDto: CreateMessageDto, sender: User, receiver: User): Promise<Message> {
        try {
            const newMsg = new this.messageModel(createMessageDto);
            
            await this.usersService.newMsg(newMsg.from, newMsg._id, 'outbox');
            await this.usersService.newMsg(newMsg.to, newMsg._id, 'inbox');

            return newMsg.save();
        } catch (err) {
            throw err;
        }
    };

    public async getMessagesByUserEmail(email: string, toFrom?: 'to' | 'from'): Promise<Message[]> {
        return toFrom ? this.messageModel.find({ [toFrom]: email }) : this.messageModel.find({ $or: [
            { to: email}, 
            { from: email}
        ] });
    }
};