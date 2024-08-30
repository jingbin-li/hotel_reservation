import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GuestModule } from './modules/guest/guest.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GqlAuthGuardGuard } from './common/gql-auth-guard/gql-auth-guard.guard';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(
      'mongodb://root:root@127.0.0.1:27017/hrs_db?authSource=admin',
    ),
    AuthModule,
    GuestModule,
    EmployeeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuardGuard,
    },
  ],
})
export class AppModule {}
