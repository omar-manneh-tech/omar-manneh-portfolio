#!/bin/bash
# Database backup script

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Get DATABASE_URL from .env
if [ -f backend/.env ]; then
  source backend/.env
fi

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not found"
  exit 1
fi

echo "📦 Creating database backup..."

# Extract connection details from DATABASE_URL
# Format: postgresql://user:password@host:port/database
DB_URL_REGEX="postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+)"
if [[ $DATABASE_URL =~ $DB_URL_REGEX ]]; then
  DB_USER="${BASH_REMATCH[1]}"
  DB_PASS="${BASH_REMATCH[2]}"
  DB_HOST="${BASH_REMATCH[3]}"
  DB_PORT="${BASH_REMATCH[4]}"
  DB_NAME="${BASH_REMATCH[5]}"
  
  # Use pg_dump to create backup
  PGPASSWORD="$DB_PASS" pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F c -f "$BACKUP_FILE"
  
  echo "✅ Backup created: $BACKUP_FILE"
  
  # Compress backup
  gzip "$BACKUP_FILE"
  echo "✅ Backup compressed: ${BACKUP_FILE}.gz"
else
  echo "❌ Invalid DATABASE_URL format"
  exit 1
fi

