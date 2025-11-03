import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact - Professional Portfolio Platform",
  description: "Get in touch with us",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Contact Us</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="label">
                  Name
                </label>
                <Input id="name" name="name" type="text" required />
              </div>
              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="input"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-4">
              Information
            </h2>
            <div className="space-y-4 text-secondary-600">
              <p>
                For general inquiries, please use the contact form or reach out
                to us at:
              </p>
              <p>
                <strong>Email:</strong> contact@portfolio-platform.com
              </p>
              <p>
                <strong>Support:</strong> support@portfolio-platform.com
              </p>
              <p className="pt-4">
                We typically respond within 24-48 hours during business days.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

