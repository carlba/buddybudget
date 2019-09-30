import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const validationPipe = new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) =>
      new UnprocessableEntityException({error: errors, message: 'test'}),
  });
  app.useGlobalPipes(validationPipe);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
