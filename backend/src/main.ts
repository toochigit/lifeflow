import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active la validation automatique pour tout le projet
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Erreur si on envoie des propriétés inconnues
      transform: true, // Transforme les types automatiquement (ex: string vers number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
