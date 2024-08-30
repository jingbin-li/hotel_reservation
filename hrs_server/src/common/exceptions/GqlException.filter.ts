import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(HttpException, GraphQLError)
export class GraphQLExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException | GraphQLError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getContext();
    const request = ctx.req;

    console.log(11111111);

    let status, message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      message =
        typeof response === 'string'
          ? response
          : (response as any).message || exception.message;
    } else if (exception instanceof GraphQLError) {
      status = exception.extensions?.code || 500;
      message = exception.message;
    } else {
      status = 500;
      message = 'Internal server error';
    }

    if (status == 401) {
      message = 'Unauthorized';
    }

    return new GraphQLError(message, {
      extensions: {
        code: status,
        timestamp: new Date().toISOString(),
        path: gqlHost.getInfo().fieldName || request.originalUrl || request.url,
      },
    });
  }
}
