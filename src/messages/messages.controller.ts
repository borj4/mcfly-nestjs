
import { Controller, HttpStatus, NotFoundException, Body, Get, Param, Post, Res, UseGuards} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UsersService } from 'src/users/users.service';
import { ok } from 'assert';
// import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
// @UseGuards(AuthGuard('jwt'))
export class MessagesController {

    constructor(
        private messageService: MessagesService,
        private usersService: UsersService,
    ) {}

    @Post()
    public async setMsgToUser(
        @Res() res,
        @Body() createMessageDto: CreateMessageDto,
    ) {
        try {
            const receiver = await this.usersService.findByEmail(createMessageDto.to);
            const sender = await this.usersService.findByEmail(createMessageDto.from);
            if (!receiver?.available) {
                return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ups! User is not active' });
            } 
            
            createMessageDto.sent = new Date();
            const newMsg = await this.messageService.createMsg(createMessageDto as CreateMessageDto, sender, receiver);               
            
            return res.status(HttpStatus.OK).json({
                message: 'Message sent successfully',
                newMsg,
            });
        
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Ups! message dont sent!' });
        }
    };s

    @Get('/:email/:toFrom')
    public async getMessagesByUserEmail(
        @Res() res,
        @Param('email') email: string,
        @Param('toFrom') toFrom: 'to' | 'from',
    ) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`We dont know this user, check if email ${email} is correct`);
        } 
        const messages = await this.messageService.getMessagesByUserEmail(email, toFrom);

        return res.status(HttpStatus.OK).json(messages);
        
    };
}
