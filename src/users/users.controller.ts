import {
    Controller,
    Get, Post, Put, Patch,
    Req, Res,
    HttpStatus,
    NotFoundException,
    Body, Param,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    // Create new user
    @Public()
    @Post('/')
    async createUser(
        @Res() res,
        @Body() createUserDto: CreateUserDto
    ) {
        const find = await this.usersService.findByEmail(createUserDto.email);

        if (find) { throw new NotFoundException('User is already registered'); }
        else {
            const user = await this.usersService.createUser(createUserDto)
            return res.status(HttpStatus.OK).json({
                message: 'Succesfully registered',
                user: user,
            });
        }
    };
    // Search available users
    @Get('/available')
    // @UseGuards(AuthGuard('jwt'))
    public async getAllActiveUsers(
        @Res() res
    ) {
        const users = await this.usersService.findAvailableUsers()
        return res.status(HttpStatus.OK).json(users); 
    };

    // Consult data user
    @Get('/:email')
    public async consult(
        @Res() res,
        @Param('email') email: string
    ) {
        try {
            const info = await this.usersService.findByEmail(email) // not destructured about email name
            return res.status(HttpStatus.OK).json({
                "name": info.name,
                "email": info.email,
                "available": info.available
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Something went wrong'
            })
        }
    };

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

    // Switch availability
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
