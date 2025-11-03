import { Controller, Get, Put, Body, UseGuards, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { UserRole } from "@prisma/client";

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Get current user profile" })
  async getMe(@CurrentUser() user: any) {
    return this.usersService.findOne(user.id);
  }

  @Put("me")
  @ApiOperation({ summary: "Update current user profile" })
  async updateMe(
    @CurrentUser() user: any,
    @Body() updateData: { name?: string; bio?: string; publicProfile?: boolean }
  ) {
    return this.usersService.update(user.id, updateData);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  async getUser(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Put(":id/role")
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ORG_ADMIN)
  @ApiOperation({ summary: "Update user role (admin only)" })
  async updateUserRole(
    @Param("id") id: string,
    @Body("role") role: UserRole
  ) {
    return this.usersService.updateRole(id, role);
  }
}

