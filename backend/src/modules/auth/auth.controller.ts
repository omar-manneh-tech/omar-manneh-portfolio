import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, VerifyMfaDto, RefreshTokenDto } from "./dto/auth.dto";
import { Public } from "@/common/decorators/public.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User registered successfully" })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login with email and password" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post("verify-mfa")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Verify MFA token" })
  @ApiResponse({ status: 200, description: "MFA verified successfully" })
  @ApiResponse({ status: 401, description: "Invalid MFA token" })
  async verifyMfa(@Body() verifyMfaDto: VerifyMfaDto) {
    return this.authService.verifyMfa(verifyMfaDto);
  }

  @Public()
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "Token refreshed successfully" })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user" })
  @ApiResponse({ status: 200, description: "Current user info" })
  async getCurrentUser(@CurrentUser() user: any) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("mfa/setup")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Setup MFA for current user" })
  @ApiResponse({ status: 200, description: "MFA setup initiated" })
  async setupMfa(@CurrentUser() user: any) {
    return this.authService.setupMfa(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post("mfa/enable")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Enable MFA for current user" })
  @ApiResponse({ status: 200, description: "MFA enabled successfully" })
  async enableMfa(@CurrentUser() user: any, @Body("token") token: string) {
    return this.authService.enableMfa(user.sub, token);
  }
}

