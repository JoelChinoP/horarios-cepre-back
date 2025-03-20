import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Principal
  const config = new DocumentBuilder()
    .setTitle('Project CPU - API Complete')
    .setDescription('Documentation of the entire project API')
    .setVersion('1.0')
    .addTag('CPU')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });

  //Configuración de prefijo global
  app.setGlobalPrefix('api');

  //Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Rechaza la solicitud si hay propiedades adicionales
      transform: true, // Transforma el payload a la instancia de la clase DTO
      //transformOptions: {
      //  enableImplicitConversion: true, // Permite conversiones implícitas de tipos
      //},
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error starting the app:', err);
});
