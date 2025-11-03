import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // CORS
  const corsOrigin = configService.get<string>("CORS_ORIGIN", "http://localhost:3000");
  app.enableCors({
    origin: corsOrigin.split(",").map((origin) => origin.trim()),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // API prefix
  app.setGlobalPrefix("api");

  // Swagger/OpenAPI documentation
  if (configService.get<string>("NODE_ENV") !== "production") {
    const config = new DocumentBuilder()
      .setTitle("Professional Portfolio Platform API")
      .setDescription("Enterprise-grade API for portfolio management")
      .setVersion("1.0")
      .addBearerAuth()
      .addTag("auth", "Authentication endpoints")
      .addTag("users", "User management")
      .addTag("profiles", "Profile management")
      .addTag("certificates", "Certificate management")
      .addTag("admin", "Admin endpoints")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }

  const port = configService.get<number>("PORT", 4000);
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}

bootstrap();

