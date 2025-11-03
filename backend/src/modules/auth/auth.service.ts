import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import * as speakeasy from "speakeasy";
import * as qrcode from "qrcode";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { User, UserRole } from "@prisma/client";
import { LoginDto, RegisterDto, VerifyMfaDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    const passwordHash = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: UserRole.PUBLIC_USER,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    const { passwordHash: _, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Check if MFA is required
    if (user.mfaEnabled) {
      return {
        requiresMfa: true,
        userId: user.id,
      };
    }

    return this.generateTokenPair(user);
  }

  async verifyMfa(verifyMfaDto: VerifyMfaDto) {
    const { userId, token } = verifyMfaDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.mfaEnabled || !user.mfaSecret) {
      throw new BadRequestException("MFA not enabled for this user");
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 2, // Allow ±2 time steps
    });

    if (!verified) {
      throw new UnauthorizedException("Invalid MFA token");
    }

    return this.generateTokenPair(user);
  }

  async generateTokenPair(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.generateRefreshToken();

    // Store refresh token
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() +
        parseInt(
          this.configService.get<string>("JWT_REFRESH_EXPIRES_IN", "7d")
            .replace("d", "") || "7"
        )
    );

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (
      !tokenRecord ||
      tokenRecord.expiresAt < new Date() ||
      tokenRecord.revokedAt
    ) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    return this.generateTokenPair(tokenRecord.user);
  }

  async setupMfa(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `${user.email} (Portfolio Platform)`,
      issuer: "Portfolio Platform",
    });

    // Update user with secret
    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaSecret: secret.base32 },
    });

    // Generate QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url || "");

    return {
      secret: secret.base32,
      qrCodeUrl,
    };
  }

  async enableMfa(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.mfaSecret) {
      throw new BadRequestException("MFA setup not completed");
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token,
      window: 2,
    });

    if (!verified) {
      throw new BadRequestException("Invalid MFA token");
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { mfaEnabled: true },
    });

    return { success: true };
  }

  private generateRefreshToken(): string {
    const crypto = require("crypto");
    return crypto.randomBytes(64).toString("hex");
  }
}

