import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphQLExceptionsFilter } from './common/exceptions/GqlException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GraphQLExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
