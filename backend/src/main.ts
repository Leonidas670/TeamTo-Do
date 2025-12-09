import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for the frontend origin provided via FRONTEND_URL env var.
  // If FRONTEND_URL is not set, fallback to enabling CORS for all origins (useful for dev).
  const FRONTEND_URL = process.env.FRONTEND_URL;
  if (FRONTEND_URL) {
    app.enableCors({ origin: FRONTEND_URL });
  } else {
    app.enableCors();
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
