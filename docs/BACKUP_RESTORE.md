# Backup & Restore Runbook

This document outlines procedures for backing up and restoring the Professional Portfolio Platform database.

## Backup Procedures

### Automated Backups

#### Daily Backups
- **Schedule**: Daily at 2:00 AM UTC
- **Retention**: 30 days
- **Method**: pg_dump with compression
- **Storage**: S3 bucket or local backup storage

#### Weekly Snapshots
- **Schedule**: Weekly on Sunday at 2:00 AM UTC
- **Retention**: 12 weeks
- **Method**: Full database snapshot
- **Storage**: S3 bucket

#### Manual Backup

Using the backup script:

```bash
./scripts/backup-db.sh
```

Backup will be saved to `./backups/backup_YYYYMMDD_HHMMSS.sql.gz`

### Direct pg_dump

```bash
PGPASSWORD=password pg_dump -h localhost -U postgres -d portfolio_db -F c -f backup.dump
```

### S3 Backup (for production)

```bash
# Upload backup to S3
aws s3 cp backup.sql.gz s3://your-backup-bucket/database-backups/
```

## Restore Procedures

### From Backup Script

```bash
./scripts/restore-db.sh backups/backup_20231201_020000.sql.gz
```

**Warning**: This will replace all data in the database!

### Manual Restore

```bash
# Decompress if needed
gunzip backup.sql.gz

# Restore
PGPASSWORD=password pg_restore -h localhost -U postgres -d portfolio_db --clean --if-exists backup.sql
```

### Point-in-Time Recovery (PostgreSQL)

If using PostgreSQL with WAL archiving:

```bash
# Create recovery.conf
echo "restore_command = 'cp /path/to/wal/%f %p'" > recovery.conf

# Point to specific WAL file
echo "recovery_target_time = '2023-12-01 02:00:00'" >> recovery.conf

# Start PostgreSQL in recovery mode
```

## Backup Verification

### Verify Backup Integrity

```bash
# Check backup file
pg_restore --list backup.dump

# Verify checksum
md5sum backup.sql.gz
```

### Test Restore

1. Create test database:
   ```bash
   createdb portfolio_db_test
   ```

2. Restore to test database:
   ```bash
   pg_restore -d portfolio_db_test backup.dump
   ```

3. Verify data:
   ```sql
   SELECT COUNT(*) FROM users;
   SELECT COUNT(*) FROM profiles;
   SELECT COUNT(*) FROM certificates;
   ```

4. Drop test database:
   ```bash
   dropdb portfolio_db_test
   ```

## Backup Storage

### Local Storage
- Location: `./backups/`
- Retention: 30 days
- Rotation: Automatic

### S3 Storage
- Bucket: `portfolio-backups`
- Lifecycle policy: 30 days standard, 90 days Glacier
- Encryption: Enabled

### Offsite Backup
- Weekly backups to separate region
- Monthly archival backups

## Disaster Recovery

### Full System Recovery

1. **Provision new infrastructure**
   - Database server
   - Application servers
   - Load balancer

2. **Restore database**
   ```bash
   # Restore from latest backup
   ./scripts/restore-db.sh latest-backup.sql.gz
   
   # Run migrations (if needed)
   cd backend
   npx prisma migrate deploy
   ```

3. **Restore application files**
   - Deploy application code
   - Restore S3 bucket contents (if applicable)

4. **Verify functionality**
   - Test authentication
   - Test file uploads
   - Verify audit logs

### Partial Recovery

#### Restore Specific Tables

```sql
-- Example: Restore users table
pg_restore -t users -d portfolio_db backup.dump

-- Example: Restore profiles table
pg_restore -t profiles -d portfolio_db backup.dump
```

#### Restore by Date Range

```sql
-- Restore data for specific date range
-- (Requires custom script based on timestamps)
```

## Backup Monitoring

### Health Checks

```bash
# Check backup file size
ls -lh backups/

# Verify backup age
find backups/ -name "*.sql.gz" -mtime +1
```

### Alerts

Set up monitoring for:
- Failed backups
- Backup size anomalies
- Backup age (should be fresh)
- Storage quota

## Retention Policy

- **Daily backups**: 30 days
- **Weekly backups**: 12 weeks (3 months)
- **Monthly backups**: 12 months (1 year)
- **Yearly backups**: 7 years (compliance)

## Compliance

- Backups encrypted at rest
- Access logs for backup operations
- Regular restore testing
- Documentation of restore procedures

## Troubleshooting

### Backup Fails

1. Check disk space
2. Verify database connection
3. Check PostgreSQL logs
4. Verify credentials

### Restore Fails

1. Verify backup file integrity
2. Check database permissions
3. Ensure sufficient disk space
4. Check for conflicting data

### Backup Too Large

1. Enable compression
2. Consider incremental backups
3. Archive old data separately

