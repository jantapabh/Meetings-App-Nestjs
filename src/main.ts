import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const option = new DocumentBuilder()
  .setTitle('Product API')
  .setDescription('Product API')
  .setVersion('1.0.0')
  .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
