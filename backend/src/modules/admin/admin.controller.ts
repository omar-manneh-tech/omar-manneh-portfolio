import {
  Controller,
  Get,
  Query,
  UseGuards,
  Res,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { Response } from "express";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";
import { UserRole, EntityType, ActionType } from "@prisma/client";

@ApiTags("admin")
@Controller("admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get("users")
  @ApiOperation({ summary: "Get all users (admin only)" })
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get("audit-logs")
  @ApiOperation({ summary: "Get audit logs (admin only)" })
  @ApiQuery({ name: "entityType", required: false, enum: EntityType })
  @ApiQuery({ name: "entityId", required: false })
  @ApiQuery({ name: "actorId", required: false })
  @ApiQuery({ name: "actionType", required: false, enum: ActionType })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "pageSize", required: false, type: Number })
  async getAuditLogs(
    @Query("entityType") entityType?: EntityType,
    @Query("entityId") entityId?: string,
    @Query("actorId") actorId?: string,
    @Query("actionType") actionType?: ActionType,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string
  ) {
    return this.adminService.getAuditLogs(
      {
        entityType,
        entityId,
        actorId,
        actionType,
      },
      page ? parseInt(page) : 1,
      pageSize ? parseInt(pageSize) : 50
    );
  }

  @Get("audit-logs/export")
  @ApiOperation({ summary: "Export audit logs as CSV (admin only)" })
  async exportAuditLogs(@Res() res: Response) {
    const csv = await this.adminService.exportAuditLogs();
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="audit-logs.csv"');
    res.send(csv);
  }

  @Get("event-log/:entityType/:entityId")
  @ApiOperation({ summary: "Get event log chain for entity (admin only)" })
  async getEventLogChain(
    @Param("entityType") entityType: EntityType,
    @Param("entityId") entityId: string
  ) {
    return this.adminService.getEventLogChain(entityType, entityId);
  }

  @Get("stats")
  @ApiOperation({ summary: "Get system statistics (admin only)" })
  async getSystemStats() {
    return this.adminService.getSystemStats();
  }
}

