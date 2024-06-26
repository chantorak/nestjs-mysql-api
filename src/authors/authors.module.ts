import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { Book } from 'src/books/entities/book.entity';
import { BooksModule } from 'src/books/books.module';
import { JwtModule } from '@nestjs/jwt';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, UserProfile, Book]),
    BooksModule,
    JwtModule,
    TenantModule,
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
