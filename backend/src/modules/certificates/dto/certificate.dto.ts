import { IsString, IsDateString, IsBoolean, IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export const createCertificateSchema = z.object({
  fileKey: z.string(),
  fileName: z.string(),
  fileSize: z.number().optional(),
  mimeType: z.string().optional(),
  issuedBy: z.string().min(1),
  issuedDate: z.string().datetime(),
  verified: z.boolean().default(false),
});

export const updateCertificateSchema = createCertificateSchema.partial();

export class CreateCertificateDto {
  @ApiProperty()
  @IsString()
  fileKey: string;

  @ApiProperty()
  @IsString()
  fileName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  fileSize?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiProperty()
  @IsString()
  issuedBy: string;

  @ApiProperty()
  @IsDateString()
  issuedDate: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

export class UpdateCertificateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fileKey?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fileName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  fileSize?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mimeType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  issuedBy?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  issuedDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}

