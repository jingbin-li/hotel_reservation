import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionsFilter } from './common/exceptions/GqlException.filter';
import { LoggingInterceptor } from './common/interceptors/ logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  app.useGlobalFilters(new GraphQLExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
