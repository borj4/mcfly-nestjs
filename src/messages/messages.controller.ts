
import { Controller, HttpStatus, NotFoundException, Body, Get, Param, Post, Res, UseGuards} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateMessageDto } from './dto/create-message.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
// @UseGuards(AuthGuard('jwt'))
export class MessagesController {

    constructor(
        private messageService: MessagesService,
        private usersService: UsersService,
        private notificationService: NotificationsService
    ) {}

    @Post()
    public async setMsgToUser(
        @Res() res,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        try {
            const addressee = await this.usersService.findByEmail(createMessageDto.to);
            if (!addressee.available) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ups! User is no active' });
            } else {
                
                const newMsg = await this.messageService.createMsg(createMessageDto);               
                console.log(addressee._id, newMsg._id); ///
                await this.notificationService.newNot(addressee._id.toString(), newMsg._id.toString());
                await this.usersService.newMsg(newMsg.from, newMsg._id);
                return res.status(HttpStatus.OK).json({
                    message: 'Message sent successfully',
                    newMsg,
                });
            }
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ups! message dont sent!' });
        }
    };

    @Get('/:email')
    public async getMsgByUser(
        @Res() res,
        @Param('email') email: string
    ) {
        const user = await this.usersService.findMgsByEmail(email)
        if (!user) {
            throw new NotFoundException(`We dont know this user, check if email ${email} is correct`);
        } else {
            const messages = user.messages.map(element => { return {message: element.message, to: element.to, sent: element.sent} })
            return res.status(HttpStatus.OK).json(messages);
        };
    };
}
