#!/bin/bash
# Database restore script

set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <backup_file.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Get DATABASE_URL from .env
if [ -f backend/.env ]; then
  source backend/.env
fi

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL not found"
  exit 1
fi

echo "⚠️  WARNING: This will replace all data in the database!"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Restore cancelled"
  exit 0
fi

echo "📦 Restoring database from backup..."

# Extract connection details
DB_URL_REGEX="postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/(.+)"
if [[ $DATABASE_URL =~ $DB_URL_REGEX ]]; then
  DB_USER="${BASH_REMATCH[1]}"
  DB_PASS="${BASH_REMATCH[2]}"
  DB_HOST="${BASH_REMATCH[3]}"
  DB_PORT="${BASH_REMATCH[4]}"
  DB_NAME="${BASH_REMATCH[5]}"
  
  # Decompress if needed
  if [[ "$BACKUP_FILE" == *.gz ]]; then
    TEMP_FILE="${BACKUP_FILE%.gz}"
    gunzip -c "$BACKUP_FILE" > "$TEMP_FILE"
    BACKUP_FILE="$TEMP_FILE"
  fi
  
  # Restore database
  PGPASSWORD="$DB_PASS" pg_restore -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" --clean --if-exists "$BACKUP_FILE"
  
  echo "✅ Database restored successfully!"
  
  # Clean up temp file if it was decompressed
  if [ -f "$TEMP_FILE" ]; then
    rm "$TEMP_FILE"
  fi
else
  echo "❌ Invalid DATABASE_URL format"
  exit 1
fi

