import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CertificatesService } from "./certificates.service";
import { CreateCertificateDto, UpdateCertificateDto } from "./dto/certificate.dto";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@ApiTags("certificates")
@Controller("certificates")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CertificatesController {
  constructor(private certificatesService: CertificatesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new certificate" })
  async create(
    @CurrentUser() user: any,
    @Body() createCertificateDto: CreateCertificateDto
  ) {
    return this.certificatesService.create(user.id, createCertificateDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all certificates for current user" })
  async findAll(@CurrentUser() user: any) {
    return this.certificatesService.findAll(user.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get certificate by ID" })
  async findOne(@Param("id") id: string, @CurrentUser() user: any) {
    return this.certificatesService.findOne(id, user.id);
  }

  @Put(":id")
  @ApiOperation({ summary: "Update certificate" })
  async update(
    @Param("id") id: string,
    @CurrentUser() user: any,
    @Body() updateCertificateDto: UpdateCertificateDto
  ) {
    return this.certificatesService.update(id, user.id, updateCertificateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete certificate" })
  async delete(@Param("id") id: string, @CurrentUser() user: any) {
    return this.certificatesService.delete(id, user.id);
  }
}

