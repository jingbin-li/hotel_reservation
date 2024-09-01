import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException, InternalServerErrorException)
export class GraphQLExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const request = ctx.req;
    const status = exception.getStatus();
    const message = exception.message;

    return new GraphQLError(message, {
      extensions: {
        code: status,
        path: gqlHost.getInfo().fieldName || request.originalUrl || request.url,
        name: exception.name,
      },
    });
  }
}
