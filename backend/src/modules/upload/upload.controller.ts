import { Controller, Post, Body, UseGuards, Get, Param } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@ApiTags("upload")
@Controller("upload")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post("presigned-url")
  @ApiOperation({ summary: "Generate presigned URL for file upload" })
  async generatePresignedUrl(
    @CurrentUser() user: any,
    @Body() body: { fileName: string; fileType: string }
  ) {
    return this.uploadService.generatePresignedUrl(
      body.fileName,
      body.fileType,
      user.id
    );
  }

  @Get("presigned-url/:fileKey")
  @ApiOperation({ summary: "Generate presigned URL for file download" })
  async generateGetPresignedUrl(@Param("fileKey") fileKey: string) {
    const url = await this.uploadService.generateGetPresignedUrl(fileKey);
    return { url };
  }
}

