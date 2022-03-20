import {
    Controller,
    Get, Post, Put, Patch,
    Req, Res,
    HttpStatus,
    Body
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor( private usersService: UsersService) {}

    @Post('/create')
    async createUser(@Res() res, @Body() createUserDto: CreateUserDto){

        // console.log(createUserDto);

        const user = await this.usersService.createUser(createUserDto)
        return res.status(HttpStatus.OK).json({
            message: 'received',
            user: user,
        })
    }

}
