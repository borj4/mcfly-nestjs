import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    UsersModule,
    NotificationsModule,
    MessagesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/mcfly-nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
