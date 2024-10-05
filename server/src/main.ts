import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { Env } from './env'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get('PORT', { infer: true })

  const config = new DocumentBuilder()
    .setTitle('Swagger - Txai')
    .setDescription('Swagger - Teste Técnico')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
  });
  
  
  await app.listen(port)
}
bootstrap();
