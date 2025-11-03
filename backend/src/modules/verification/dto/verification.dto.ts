import { IsString, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { VerificationStatus } from "@prisma/client";
import { z } from "zod";

export const createVerificationSchema = z.object({
  note: z.string().optional(),
});

export const updateVerificationSchema = z.object({
  status: z.nativeEnum(VerificationStatus),
  note: z.string().optional(),
});

export class CreateVerificationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

export class UpdateVerificationDto {
  @ApiProperty({ enum: VerificationStatus })
  @IsEnum(VerificationStatus)
  status: VerificationStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

