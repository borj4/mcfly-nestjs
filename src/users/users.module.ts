import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notifications/notifications.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema} from '../schemas/users.schema'

@Module({
  imports: [

    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
    forwardRef(() => NotificationsModule),

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
