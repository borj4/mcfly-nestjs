import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/utilities/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Message.name, schema: MessageSchema } ]),
    UsersModule,
    AuthModule
  ],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService]
})
export class MessagesModule {}
