import { IsString, IsOptional, IsObject, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

export const createProfileSchema = z.object({
  publicUrlSlug: z.string().min(3).max(50).optional(),
  theme: z.enum(["corporate", "modern", "conservative"]).default("corporate"),
  visibilitySettings: z.record(z.any()).default({}),
});

export const updateProfileSchema = createProfileSchema.partial();

export class CreateProfileDto {
  @ApiProperty({ required: false, example: "john-doe-portfolio" })
  @IsOptional()
  @IsString()
  publicUrlSlug?: string;

  @ApiProperty({
    required: false,
    enum: ["corporate", "modern", "conservative"],
    default: "corporate",
  })
  @IsOptional()
  @IsEnum(["corporate", "modern", "conservative"])
  theme?: string;

  @ApiProperty({ required: false, type: Object, default: {} })
  @IsOptional()
  @IsObject()
  visibilitySettings?: Record<string, any>;
}

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  publicUrlSlug?: string;

  @ApiProperty({ required: false, enum: ["corporate", "modern", "conservative"] })
  @IsOptional()
  @IsEnum(["corporate", "modern", "conservative"])
  theme?: string;

  @ApiProperty({ required: false, type: Object })
  @IsOptional()
  @IsObject()
  visibilitySettings?: Record<string, any>;
}

