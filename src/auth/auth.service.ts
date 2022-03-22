import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
    ) {}

    private getUserToken(user: User): string {
        const { password, ...safeUser} = user;

        return this.jwtService.sign(safeUser, { expiresIn: 3600 });
    }

    public async verifyUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) throw new Error('This user is not in our database');
        if (password !== user.password) throw new Error('The provided password is not correct');
        
        return this.getUserToken(user);
    }
}