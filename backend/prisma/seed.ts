import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo users
  const passwordHash = await bcrypt.hash("Demo123!@#", 10);

  // 1. Civil Servant User
  const civilServant = await prisma.user.upsert({
    where: { email: "civil.servant@example.com" },
    update: {},
    create: {
      email: "civil.servant@example.com",
      name: "Jane Government",
      passwordHash,
      role: UserRole.VERIFIED_USER,
      bio: "Senior Policy Analyst with 10+ years of experience in public sector",
      publicProfile: true,
      emailVerified: new Date(),
    },
  });

  // 2. NGO Staff User
  const ngoStaff = await prisma.user.upsert({
    where: { email: "ngo.staff@example.com" },
    update: {},
    create: {
      email: "ngo.staff@example.com",
      name: "John Humanitarian",
      passwordHash,
      role: UserRole.VERIFIED_USER,
      bio: "Program Manager at International Development NGO",
      publicProfile: true,
      emailVerified: new Date(),
    },
  });

  // 3. Private Consultant
  const privateConsultant = await prisma.user.upsert({
    where: { email: "private.consultant@example.com" },
    update: {},
    create: {
      email: "private.consultant@example.com",
      name: "Alice Professional",
      passwordHash,
      role: UserRole.VERIFIED_USER,
      bio: "Independent Consultant specializing in IT Strategy and Digital Transformation",
      publicProfile: true,
      emailVerified: new Date(),
    },
  });

  // 4. Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "System Administrator",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      bio: "Platform Administrator",
      publicProfile: false,
      mfaEnabled: true,
      emailVerified: new Date(),
    },
  });

  // Create profiles
  const civilServantProfile = await prisma.profile.upsert({
    where: { userId: civilServant.id },
    update: {},
    create: {
      userId: civilServant.id,
      publicUrlSlug: "jane-government",
      theme: "corporate",
      visibilitySettings: {
        showEmail: false,
        showPhone: false,
        showAddress: false,
      },
    },
  });

  const ngoStaffProfile = await prisma.profile.upsert({
    where: { userId: ngoStaff.id },
    update: {},
    create: {
      userId: ngoStaff.id,
      publicUrlSlug: "john-humanitarian",
      theme: "modern",
      visibilitySettings: {
        showEmail: false,
        showPhone: false,
      },
    },
  });

  const consultantProfile = await prisma.profile.upsert({
    where: { userId: privateConsultant.id },
    update: {},
    create: {
      userId: privateConsultant.id,
      publicUrlSlug: "alice-professional",
      theme: "corporate",
      visibilitySettings: {
        showEmail: true,
        showPhone: false,
      },
    },
  });

  // Create positions
  await prisma.position.createMany({
    skipDuplicates: true,
    data: [
      {
        profileId: civilServantProfile.id,
        title: "Senior Policy Analyst",
        organization: "Ministry of Public Administration",
        startDate: new Date("2015-01-01"),
        isCurrent: true,
        description: "Leading policy development and implementation initiatives",
      },
      {
        profileId: civilServantProfile.id,
        title: "Policy Analyst",
        organization: "Ministry of Public Administration",
        startDate: new Date("2012-06-01"),
        endDate: new Date("2014-12-31"),
        description: "Analyzed and drafted policy documents",
      },
      {
        profileId: ngoStaffProfile.id,
        title: "Program Manager",
        organization: "Global Development Initiative",
        startDate: new Date("2018-03-01"),
        isCurrent: true,
        description: "Managing international development programs",
      },
      {
        profileId: consultantProfile.id,
        title: "IT Strategy Consultant",
        organization: "Independent",
        startDate: new Date("2020-01-01"),
        isCurrent: true,
        description: "Providing strategic IT consulting services",
      },
    ],
  });

  // Create achievements
  await prisma.achievement.createMany({
    skipDuplicates: true,
    data: [
      {
        profileId: civilServantProfile.id,
        title: "Policy Excellence Award",
        description: "Recognized for outstanding contribution to public policy",
        date: new Date("2022-12-01"),
        evidenceUrls: ["https://example.com/award"],
      },
      {
        profileId: ngoStaffProfile.id,
        title: "Program Impact Achievement",
        description: "Managed program impacting 50,000+ beneficiaries",
        date: new Date("2023-06-01"),
      },
      {
        profileId: consultantProfile.id,
        title: "Digital Transformation Project",
        description: "Led digital transformation for major enterprise",
        date: new Date("2023-09-01"),
        evidenceUrls: ["https://example.com/project"],
      },
    ],
  });

  // Create sample certificates (with placeholder file keys)
  const certificates = await prisma.certificate.createMany({
    skipDuplicates: true,
    data: [
      {
        profileId: civilServantProfile.id,
        fileKey: "certificates/sample-cert-1.pdf",
        fileName: "Public Administration Certificate.pdf",
        fileSize: 1024000,
        mimeType: "application/pdf",
        issuedBy: "National Institute of Public Administration",
        issuedDate: new Date("2015-05-15"),
        verified: true,
        verifiedAt: new Date("2023-01-01"),
      },
      {
        profileId: ngoStaffProfile.id,
        fileKey: "certificates/sample-cert-2.pdf",
        fileName: "Program Management Certificate.pdf",
        fileSize: 950000,
        mimeType: "application/pdf",
        issuedBy: "International Development Institute",
        issuedDate: new Date("2018-08-20"),
        verified: true,
        verifiedAt: new Date("2023-02-01"),
      },
      {
        profileId: consultantProfile.id,
        fileKey: "certificates/sample-cert-3.pdf",
        fileName: "IT Strategy Certification.pdf",
        fileSize: 1100000,
        mimeType: "application/pdf",
        issuedBy: "Technology Leadership Institute",
        issuedDate: new Date("2020-03-10"),
        verified: false,
      },
    ],
  });

  console.log("✅ Seeding completed!");
  console.log("\nDemo users created:");
  console.log(`- Civil Servant: ${civilServant.email} / Demo123!@#`);
  console.log(`- NGO Staff: ${ngoStaff.email} / Demo123!@#`);
  console.log(`- Private Consultant: ${privateConsultant.email} / Demo123!@#`);
  console.log(`- Admin: ${admin.email} / Demo123!@#`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

