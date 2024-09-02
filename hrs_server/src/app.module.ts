import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlAuthGuardGuard } from './common/gql-auth-guard/gql-auth-guard.guard';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { GuestModule } from './modules/guest/guest.module';
import { UsersModule } from './modules/users/users.module';
import { RolesGuard } from './common/gql-auth-guard/role-guerd';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: async ({ req }) => {
          const token = req.headers.authorization?.split(' ')[1];
          const user = token ? await authService.getPayload(token) : null;
          return { user };
        },
      }),
      inject: [AuthService],
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
    RolesGuard,
  ],
})
export class AppModule {}
