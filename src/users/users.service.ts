import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    // Crear nuevo usuario
    public async createUser( createUserDto: CreateUserDto ): Promise<User> {
        const user = new this.userModel(createUserDto);
        return await user.save();
    };

    // Comprobar email en la bbdd
    public async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    };
    
    // Update
    public async update( email: string, updateUserDto: UpdateUserDto): Promise<User> {
        const preUser = await this.userModel.findOneAndUpdate({email}, updateUserDto).exec();
        if(preUser) {
            return preUser
        } else {
            throw new NotFoundException(`No users registered with email: ${email}`);
        };
    };

    // Buscar usuarios disponibles
    public async findAvailableUsers(): Promise<User[]> {
        return await this.userModel.find({ 'available': true }, '-_id -__v -notifications -messages -password').exec();
    };

    // Actualizar disponibilidad
    public async switchAvailability( email: string ): Promise<User> {
        const preUser = await this.userModel.findOne({ email }).exec();

        if(preUser) {
            preUser.available = !preUser.available;
            return await preUser.save();
        } else {
            throw new NotFoundException(`user not found with this email: ${email}`);
        }
    };

    // updates the user object to push the new message into the correct array
    public async newMsg( email: string, messageId: string, box: 'inbox' | 'outbox' ): Promise<void> {
        await this.userModel.findOneAndUpdate({ email }, { $push: { [box]: messageId} } )
    };

}