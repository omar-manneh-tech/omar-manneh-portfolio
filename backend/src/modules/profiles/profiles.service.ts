import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { CreateProfileDto, UpdateProfileDto } from "./dto/profile.dto";
import { Profile } from "@prisma/client";

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createProfileDto: CreateProfileDto) {
    // Check if profile already exists
    const existing = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new BadRequestException("Profile already exists for this user");
    }

    return this.prisma.profile.create({
      data: {
        userId,
        ...createProfileDto,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
          },
        },
        positions: true,
        achievements: true,
        certificates: true,
      },
    });
  }

  async findOne(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
          },
        },
        positions: true,
        achievements: true,
        certificates: {
          include: {
            verifications: true,
          },
        },
      },
    });
  }

  async findByUserId(userId: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
          },
        },
        positions: true,
        achievements: true,
        certificates: {
          include: {
            verifications: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: { publicUrlSlug: slug },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
          },
        },
        positions: {
          orderBy: {
            startDate: "desc",
          },
        },
        achievements: {
          orderBy: {
            date: "desc",
          },
        },
        certificates: {
          include: {
            verifications: true,
          },
          orderBy: {
            issuedDate: "desc",
          },
        },
      },
    });
  }

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return this.prisma.profile.update({
      where: { id: profile.id },
      data: updateProfileDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
          },
        },
        positions: true,
        achievements: true,
        certificates: true,
      },
    });
  }

  async delete(userId: string) {
    const profile = await this.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return this.prisma.profile.delete({
      where: { id: profile.id },
    });
  }
}

