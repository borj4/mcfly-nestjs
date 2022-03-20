import {
    Controller,
    Get, Post, Put, Patch,
    Req, Res,
    HttpStatus,
    Body
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {

    @Post('/create')
    createUser(@Res() res, @Body() createUserDto: createUserDto){

        console.log(createUserDto);

        return res.status(HttpStatus.OK).json({
            message: 'received'
        })
    }

}
