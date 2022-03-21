import {
    Controller,
    Get, Post, Put, Patch,
    Req, Res,
    HttpStatus,
    NotFoundException,
    Body, Param,
    UseGuards
} from '@nestjs/common';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private notificationService: NotificationsService,
    ) {}

    // Crear nuevo usuario
    @Post('/create')
    async createUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto
    ) {
        const find = await this.usersService.findByEmail(createUserDto.email);

        if (find) { throw new NotFoundException('User is already registered'); }
        else {
            const notificationId = await this.notificationService.create()
            createUserDto.notifications = notificationId
            const user = await this.usersService.createUser(createUserDto)
            return res.status(HttpStatus.OK).json({
                message: 'Succesfully registered',
                user: user,
            });
        }
    };

    // Login

    // Logout

    // Update
    @Put('/:email')
    // @UseGuards(AuthGuard('jwt'))
    public async updateUser(
        @Res() res,
        @Param('email') email: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        try {
            const user = await this.usersService.update(
                email,
                updateUserDto,
            );
            if (!user) {
                throw new NotFoundException('We dont know this user');
            } else {
                return res.status(HttpStatus.OK).json({
                    message: 'User has been successfully updated',
                    user,
                });
            }
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong: not updated',
                status: 400,
            });
        }
    };

    // Buscar usuarios disponibles
    @Get('/available')
    // @UseGuards(AuthGuard('jwt'))
    public async getAllActiveUsers(
        @Res() res
    ) {
        const users = await this.usersService.findAvailableUsers()
        return res.status(HttpStatus.OK).json(users); 
    };

    // Actualizar disponibilidad
    @Patch('/:email')
    // @UseGuards(AuthGuard('jwt'))
    public async switchAvailability(
        @Res() res,
        @Param('email') email: string,
    ) {
        try {
            const user = await this.usersService.switchAvailability(email)

            return res.status(HttpStatus.OK).json({
                message: user.available ? 'Now you are active' : 'Now you are not active'
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Uuups, availability not updated!',
                status: 400,
            });
        }
    };

}
