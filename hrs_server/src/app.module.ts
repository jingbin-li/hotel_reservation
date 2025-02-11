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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`],
      isGlobal: true,
    }),
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
    MongooseModule.forRoot(process.env.MONGO_URI),
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
