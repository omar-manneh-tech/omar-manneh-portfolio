#!/bin/bash
# Seed database script

set -e

echo "🌱 Seeding database..."

cd backend

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL environment variable is not set"
  echo "Please set it in your .env file"
  exit 1
fi

# Run Prisma migrations
echo "📦 Running migrations..."
npx prisma migrate deploy

# Run seed script
echo "🌱 Running seed script..."
npx ts-node prisma/seed.ts

echo "✅ Database seeded successfully!"

