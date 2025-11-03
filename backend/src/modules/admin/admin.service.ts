import { Injectable, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { UserRole, EntityType, ActionType } from "@prisma/client";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        publicProfile: true,
        mfaEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getAuditLogs(
    filters?: {
      entityType?: EntityType;
      entityId?: string;
      actorId?: string;
      actionType?: ActionType;
      startDate?: Date;
      endDate?: Date;
    },
    page = 1,
    pageSize = 50
  ) {
    const where: any = {};

    if (filters?.entityType) {
      where.entityType = filters.entityType;
    }
    if (filters?.entityId) {
      where.entityId = filters.entityId;
    }
    if (filters?.actorId) {
      where.actorId = filters.actorId;
    }
    if (filters?.actionType) {
      where.actionType = filters.actionType;
    }
    if (filters?.startDate || filters?.endDate) {
      where.timestamp = {};
      if (filters.startDate) {
        where.timestamp.gte = filters.startDate;
      }
      if (filters.endDate) {
        where.timestamp.lte = filters.endDate;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.audit.findMany({
        where,
        orderBy: {
          timestamp: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.audit.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async exportAuditLogs(filters?: any) {
    const logs = await this.prisma.audit.findMany({
      where: filters,
      orderBy: {
        timestamp: "desc",
      },
    });

    // Convert to CSV format
    const headers = [
      "ID",
      "Entity Type",
      "Entity ID",
      "Actor ID",
      "Action Type",
      "IP",
      "User Agent",
      "Timestamp",
    ];

    const rows = logs.map((log) => [
      log.id,
      log.entityType,
      log.entityId,
      log.actorId || "",
      log.actionType,
      log.ip || "",
      log.userAgent || "",
      log.timestamp.toISOString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    return csv;
  }

  async getEventLogChain(entityType: EntityType, entityId: string) {
    return this.prisma.eventLog.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: {
        timestamp: "asc",
      },
    });
  }

  async getSystemStats() {
    const [userCount, profileCount, certificateCount, verificationCount] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.profile.count(),
        this.prisma.certificate.count(),
        this.prisma.verification.count({
          where: {
            status: "VERIFIED",
          },
        }),
      ]);

    return {
      users: userCount,
      profiles: profileCount,
      certificates: certificateCount,
      verifiedCertificates: verificationCount,
    };
  }
}

