import { Controller, Get, HttpStatus, NotFoundException, Param, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('notifications')
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
        const notifications = user.notifications.messages.map(e => { return {message: e.message, from: e.from, send: e.sent} })
        return res.status(HttpStatus.OK).json(notifications);
    };
}