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
import { ProfilesService } from "./profiles.service";
import { CreateProfileDto, UpdateProfileDto } from "./dto/profile.dto";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { Public } from "@/common/decorators/public.decorator";

@ApiTags("profiles")
@Controller("profiles")
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new profile" })
  async create(
    @CurrentUser() user: any,
    @Body() createProfileDto: CreateProfileDto
  ) {
    return this.profilesService.create(user.id, createProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's profile" })
  async getMyProfile(@CurrentUser() user: any) {
    return this.profilesService.findByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update current user's profile" })
  async updateMyProfile(
    @CurrentUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    return this.profilesService.update(user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("me")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete current user's profile" })
  async deleteMyProfile(@CurrentUser() user: any) {
    return this.profilesService.delete(user.id);
  }

  @Public()
  @Get("slug/:slug")
  @ApiOperation({ summary: "Get public profile by slug" })
  async getPublicProfile(@Param("slug") slug: string) {
    return this.profilesService.findBySlug(slug);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get profile by ID" })
  async getProfile(@Param("id") id: string) {
    return this.profilesService.findOne(id);
  }
}

