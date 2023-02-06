import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersStorage } from './store/user.storage';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersStorage],
})
export class UsersModule {}
