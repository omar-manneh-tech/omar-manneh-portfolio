import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { VerificationStatus } from "@prisma/client";
import { CreateVerificationDto } from "./dto/verification.dto";

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async create(certificateId: string, verifierId: string, createVerificationDto: CreateVerificationDto) {
    const certificate = await this.prisma.certificate.findUnique({
      where: { id: certificateId },
    });

    if (!certificate) {
      throw new NotFoundException("Certificate not found");
    }

    const verification = await this.prisma.verification.create({
      data: {
        certificateId,
        verifierId,
        status: VerificationStatus.PENDING,
        ...createVerificationDto,
      },
    });

    return verification;
  }

  async updateStatus(
    verificationId: string,
    verifierId: string,
    status: VerificationStatus,
    note?: string
  ) {
    const verification = await this.prisma.verification.findUnique({
      where: { id: verificationId },
      include: {
        certificate: true,
      },
    });

    if (!verification) {
      throw new NotFoundException("Verification not found");
    }

    if (verification.verifierId !== verifierId) {
      throw new BadRequestException("You can only update your own verifications");
    }

    const updated = await this.prisma.verification.update({
      where: { id: verificationId },
      data: {
        status,
        note,
      },
    });

    // Update certificate verified status if verified
    if (status === VerificationStatus.VERIFIED) {
      await this.prisma.certificate.update({
        where: { id: verification.certificateId },
        data: {
          verified: true,
          verifiedAt: new Date(),
        },
      });
    }

    return updated;
  }

  async findAll(certificateId: string) {
    return this.prisma.verification.findMany({
      where: { certificateId },
      include: {
        verifier: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

