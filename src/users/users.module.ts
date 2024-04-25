import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { Book } from 'src/books/entities/book.entity';
import { ConfigModule } from '@nestjs/config';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, Book]),
    ConfigModule,
    TenantModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
