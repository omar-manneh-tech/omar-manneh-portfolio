import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { EntityType, ActionType } from "@prisma/client";
import * as crypto from "crypto";

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logEvent(
    entityType: EntityType,
    entityId: string,
    actionType: ActionType,
    actorId: string | null,
    before: any,
    after: any,
    ip?: string,
    userAgent?: string,
    requestBody?: any
  ) {
    const requestHash = requestBody
      ? crypto.createHash("sha256").update(JSON.stringify(requestBody)).digest("hex")
      : null;

    return this.prisma.audit.create({
      data: {
        entityType,
        entityId,
        actorId,
        actionType,
        before: before ? JSON.parse(JSON.stringify(before)) : null,
        after: after ? JSON.parse(JSON.stringify(after)) : null,
        ip,
        userAgent,
        requestHash,
      },
    });
  }

  async logToEventChain(
    eventType: string,
    entityType: EntityType,
    entityId: string,
    payload: any
  ) {
    // Get the last event hash for chaining
    const lastEvent = await this.prisma.eventLog.findFirst({
      where: {
        entityType,
        entityId,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    const previousHash = lastEvent?.currentHash || null;

    // Create current hash
    const hashData = JSON.stringify({
      eventType,
      entityType,
      entityId,
      payload,
      previousHash,
      timestamp: new Date().toISOString(),
    });

    const currentHash = crypto.createHash("sha256").update(hashData).digest("hex");

    return this.prisma.eventLog.create({
      data: {
        eventType,
        entityType,
        entityId,
        payload: JSON.parse(JSON.stringify(payload)),
        previousHash,
        currentHash,
      },
    });
  }
}

