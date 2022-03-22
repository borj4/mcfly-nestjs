import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    MessagesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mcfly-nestjs'),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
