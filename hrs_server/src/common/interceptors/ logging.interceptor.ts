import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const request = GqlExecutionContext.create(context).getContext().req;
    const { method, url } = request;

    console.log(`[${new Date().toISOString()}] ${method} ${url} - Start`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `[${new Date().toISOString()}] ${method} ${url} - End (${Date.now() - now}ms)`,
          ),
        ),
      );
  }
}
