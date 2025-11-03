import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { CreateCertificateDto, UpdateCertificateDto } from "./dto/certificate.dto";

@Injectable()
export class CertificatesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCertificateDto: CreateCertificateDto) {
    // Verify user has a profile
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found. Please create a profile first.");
    }

    return this.prisma.certificate.create({
      data: {
        profileId: profile.id,
        ...createCertificateDto,
      },
    });
  }

  async findAll(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException("Profile not found");
    }

    return this.prisma.certificate.findMany({
      where: { profileId: profile.id },
      include: {
        verifications: {
          include: {
            verifier: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        issuedDate: "desc",
      },
    });
  }

  async findOne(id: string, userId?: string) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
        verifications: true,
      },
    });

    if (!certificate) {
      throw new NotFoundException("Certificate not found");
    }

    // Check access
    if (userId && certificate.profile.userId !== userId) {
      throw new ForbiddenException("You don't have access to this certificate");
    }

    return certificate;
  }

  async update(id: string, userId: string, updateCertificateDto: UpdateCertificateDto) {
    await this.findOne(id, userId); // This will throw if not found or no access

    return this.prisma.certificate.update({
      where: { id },
      data: updateCertificateDto,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId); // This will throw if not found or no access

    return this.prisma.certificate.delete({
      where: { id },
    });
  }
}

