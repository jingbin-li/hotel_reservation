import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionsFilter } from './common/exceptions/GqlException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLExceptionsFilter());
  app.enableCors({
    origin: 'http://localhost:5173', // 允许的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
    credentials: true, // 是否允许发送凭据（如 Cookies 等）
  });

  await app.listen(3000);
}
bootstrap();
