import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { VerificationService } from "./verification.service";
import { CreateVerificationDto, UpdateVerificationDto } from "./dto/verification.dto";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { VerificationStatus } from "@prisma/client";

@ApiTags("verifications")
@Controller("verifications")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VerificationController {
  constructor(private verificationService: VerificationService) {}

  @Post("certificate/:certificateId")
  @ApiOperation({ summary: "Create a verification request" })
  async create(
    @Param("certificateId") certificateId: string,
    @CurrentUser() user: any,
    @Body() createVerificationDto: CreateVerificationDto
  ) {
    return this.verificationService.create(certificateId, user.id, createVerificationDto);
  }

  @Get("certificate/:certificateId")
  @ApiOperation({ summary: "Get all verifications for a certificate" })
  async findAll(@Param("certificateId") certificateId: string) {
    return this.verificationService.findAll(certificateId);
  }

  @Put(":id/status")
  @ApiOperation({ summary: "Update verification status" })
  async updateStatus(
    @Param("id") id: string,
    @CurrentUser() user: any,
    @Body() updateVerificationDto: UpdateVerificationDto
  ) {
    return this.verificationService.updateStatus(
      id,
      user.id,
      updateVerificationDto.status,
      updateVerificationDto.note
    );
  }
}

