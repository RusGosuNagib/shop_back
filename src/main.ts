import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: 'http://185.117.154.177',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
