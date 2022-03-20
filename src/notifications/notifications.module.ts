import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from 'src/schemas/notification.schema';
import { UsersModule } from 'src/users/users.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Notification.name, schema: NotificationSchema }]),
    forwardRef(() => UsersModule)
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
