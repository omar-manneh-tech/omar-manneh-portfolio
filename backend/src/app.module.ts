import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProfilesModule } from "./modules/profiles/profiles.module";
import { CertificatesModule } from "./modules/certificates/certificates.module";
import { UploadModule } from "./modules/upload/upload.module";
import { AdminModule } from "./modules/admin/admin.module";
import { AuditModule } from "./modules/audit/audit.module";
import { VerificationModule } from "./modules/verification/verification.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    CertificatesModule,
    UploadModule,
    AdminModule,
    AuditModule,
    VerificationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

