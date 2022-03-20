import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    public async createUser( createUserDto: CreateUserDto ): Promise<User> {
        const user = new this.userModel(createUserDto);
        return await user.save()
    };

    public async findByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email }, '-__v -messages').exec();
    }
}