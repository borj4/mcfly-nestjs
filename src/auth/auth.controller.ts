import { Controller, HttpStatus, Inject, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('login')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    
    @Public()
    @Post('/')
    async login(
        @Res() res: Response,
        @Body() body: LoginDto,
    ): Promise<Response<any>> {
        const { email, password } = body;
        try {
            const token = await this.authService.verifyUser(email, password);

            return res.status(HttpStatus.ACCEPTED).json(token);
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json(err);
        }
        
    };
}