import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Tenant } from './tenant.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { Book } from 'src/books/entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

export const TenantConnectionService = 'TenantConnectionService';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), ConfigModule],
  providers: [
    {
      provide: TenantConnectionService,
      inject: [REQUEST, DataSource, ConfigService],
      scope: Scope.REQUEST,
      useFactory: async (
        request,
        connection: DataSource,
        configService: ConfigService,
      ) => {
        const tenant: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { organisation: request.headers.organisation } });

        return await new DataSource({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: tenant.dbName,
          entities: [User, UserProfile, Book, Author],
          synchronize: true,
        }).initialize();
      },
    },
  ],
  exports: [TenantConnectionService],
})
export class TenantModule {}
