import { Controller, Get, HttpStatus, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notifications')
// @UseGuards(AuthGuard('jwt'))
export class NotificationsController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get('/:email')
    public async getUserByEmail( @Res() res, @Param('email') email: string ) {
        const user = await this.usersService.findNotsByEmail(email)
        if (!user) {
            throw new NotFoundException('We dont know this user');
        }
        // DONT WORK
        const notifications = user.notifications.messages.map(e => { return {message: e.message, from: e.from, send: e.sent} });+
        console.log(notifications);
        console.log(user);
        return res.status(HttpStatus.OK).json(notifications);
    };
}