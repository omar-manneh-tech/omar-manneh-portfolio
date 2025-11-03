import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Professional Portfolio Platform",
  description: "Learn about the Professional Portfolio Platform",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">About</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-secondary-600 mb-6">
            The Professional Portfolio Platform is an enterprise-grade solution designed
            for civil servants, NGO staff, HR officers, and institutional IT
            decision-makers to create verified, shareable digital portfolios.
          </p>

          <h2 className="text-2xl font-semibold text-secondary-900 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-secondary-600 mb-6">
            To provide a secure, scalable, and reliable platform that enables
            professionals to showcase their achievements, certificates, and career
            journey with confidence and verification.
          </p>

          <h2 className="text-2xl font-semibold text-secondary-900 mt-8 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-6">
            <li>Verified certificate management with tamper-evident audit logs</li>
            <li>Role-based access control and MFA for administrators</li>
            <li>Comprehensive audit logging for compliance</li>
            <li>Multiple professional themes suitable for institutional use</li>
            <li>PDF export for offline sharing</li>
            <li>Enterprise-grade security and performance</li>
          </ul>

          <h2 className="text-2xl font-semibold text-secondary-900 mt-8 mb-4">
            Technology Stack
          </h2>
          <p className="text-secondary-600 mb-4">
            Built with modern, production-ready technologies:
          </p>
          <ul className="list-disc list-inside text-secondary-600 space-y-2 mb-6">
            <li><strong>Frontend:</strong> Next.js 14, React, TypeScript, Tailwind CSS</li>
            <li><strong>Backend:</strong> NestJS, TypeScript, PostgreSQL</li>
            <li><strong>Storage:</strong> AWS S3 for certificates and files</li>
            <li><strong>Security:</strong> JWT with refresh tokens, MFA (TOTP), RBAC</li>
            <li><strong>DevOps:</strong> Docker, GitHub Actions CI/CD</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

