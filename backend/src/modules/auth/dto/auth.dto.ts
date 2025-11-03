import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";

// Zod schemas for validation
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
  name: z.string().min(1).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const verifyMfaSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().length(6),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

// DTOs for class-validator
export class RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecurePassword123!", required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiProperty({ example: "John Doe", required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

export class LoginDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecurePassword123!" })
  @IsString()
  @MinLength(1)
  password: string;
}

export class VerifyMfaDto {
  @ApiProperty({ example: "123e4567-e89b-12d3-a456-426614174000" })
  @IsString()
  userId: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  token: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

