import { Controller, HttpStatus, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/')
    async login(
        @Res() res: Response,
        @Body() body: { email: string, password: string }
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