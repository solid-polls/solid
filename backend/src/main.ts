import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'dev') {
    app.enableCors({ origin: 'http://localhost:8000' });
  } else {
    app.enableCors({ origin: 'https://app.solidpolls.de' });
  }

  const config = new DocumentBuilder()
    .setTitle('Solid Polls')
    .addServer('http://localhost:3000', 'Testing')
    .addServer('https://api.solidpolls.de', 'Production')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
