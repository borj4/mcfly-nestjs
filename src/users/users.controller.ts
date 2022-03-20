import {
    Controller,
    Get, Post, Put, Patch,
    Req, Res,
    HttpStatus,
    NotFoundException,
    Body, Param
} from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private notificationService: NotificationsService
    ) {}

    @Post('/create')
    async createUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto
    ){
        const find = await this.usersService.findByEmail(createUserDto.email);

        if (find) { throw new NotFoundException('User is already registered'); }
        else {
            const user = await this.usersService.createUser(createUserDto)
            return res.status(HttpStatus.OK).json({
                message: 'Succesfully registered',
                user: user,
            });
        }
    }
}
