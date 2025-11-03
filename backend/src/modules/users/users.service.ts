import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { User, UserRole } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        publicProfile: true,
        mfaEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        bio: true,
        publicProfile: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateRole(id: string, role: UserRole): Promise<User> {
    return this.update(id, { role });
  }
}

