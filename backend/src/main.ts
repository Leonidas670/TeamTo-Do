import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS using env var(s).
  // Accept a single FRONTEND_URL or a comma-separated FRONTEND_URLS list.
  // Trim trailing slashes so `https://site.netlify.app/` and
  // `https://site.netlify.app` are treated the same.
  const raw = process.env.FRONTEND_URLS ?? process.env.FRONTEND_URL;
  
  if (raw) {
    const allowed = raw
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => (s.endsWith('/') ? s.slice(0, -1) : s));

    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        const normalized = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        if (allowed.includes(normalized)) return callback(null, true);
        return callback(new Error('CORS origin denied'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
  } else {
    // No FRONTEND_URL specified: allow all origins (development convenience).
    app.enableCors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });
  }
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();