import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard - Professional Portfolio Platform",
  description: "Your portfolio dashboard",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              My Profile
            </h2>
            <p className="text-secondary-600 mb-4">
              View and manage your public portfolio profile
            </p>
            <Button asChild>
              <Link href="/dashboard/profile">Manage Profile</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              Certificates
            </h2>
            <p className="text-secondary-600 mb-4">
              Upload and manage your certificates
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/certificates">Manage Certificates</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              Achievements
            </h2>
            <p className="text-secondary-600 mb-4">
              Add and showcase your achievements
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/achievements">Manage Achievements</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              Public View
            </h2>
            <p className="text-secondary-600 mb-4">
              Preview your public portfolio
            </p>
            <Button asChild variant="outline">
              <Link href="/profile/me">View Public Profile</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              Settings
            </h2>
            <p className="text-secondary-600 mb-4">
              Manage your account settings and preferences
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-2">
              Export PDF
            </h2>
            <p className="text-secondary-600 mb-4">
              Download your portfolio as a PDF
            </p>
            <Button asChild variant="outline">
              <Link href="/dashboard/export">Export PDF</Link>
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}

