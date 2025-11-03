import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { EntityType, ActionType } from "@prisma/client";
import * as crypto from "crypto";

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, body, user, ip, headers } = request;
    const userAgent = headers["user-agent"];

    // Set session variables for PostgreSQL triggers
    if (user?.id) {
      // This would be set via a database connection setup
      // For now, we'll log manually in the response
    }

    return next.handle().pipe(
      tap(async (response) => {
        // Manual audit logging for operations not handled by triggers
        const entityType = this.getEntityType(request.url);
        const actionType = this.getActionType(method);

        if (entityType && actionType) {
          const requestHash = body
            ? crypto
                .createHash("sha256")
                .update(JSON.stringify(body))
                .digest("hex")
            : null;

          try {
            await this.prisma.audit.create({
              data: {
                entityType,
                entityId: response?.id || request.params?.id || "unknown",
                actorId: user?.id || null,
                actionType,
                before: request.body?.before || null,
                after: request.body || null,
                ip,
                userAgent,
                requestHash,
              },
            });
          } catch (error) {
            // Don't fail the request if audit logging fails
            console.error("Audit logging failed:", error);
          }
        }
      })
    );
  }

  private getEntityType(url: string): EntityType | null {
    if (url.includes("/users")) return EntityType.USER;
    if (url.includes("/profiles")) return EntityType.PROFILE;
    if (url.includes("/positions")) return EntityType.POSITION;
    if (url.includes("/achievements")) return EntityType.ACHIEVEMENT;
    if (url.includes("/certificates")) return EntityType.CERTIFICATE;
    if (url.includes("/verifications")) return EntityType.VERIFICATION;
    return null;
  }

  private getActionType(method: string): ActionType | null {
    switch (method.toUpperCase()) {
      case "POST":
        return ActionType.CREATE;
      case "PUT":
      case "PATCH":
        return ActionType.UPDATE;
      case "DELETE":
        return ActionType.DELETE;
      default:
        return null;
    }
  }
}

