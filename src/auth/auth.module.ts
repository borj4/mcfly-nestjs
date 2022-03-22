import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
// import { UserSchema } from 'src/schemas/users.schema';

@Module({
  // providers: [AuthService],
  // controllers: [AuthController],  
  // exports: [AuthService]
})
export class AuthModule {}
