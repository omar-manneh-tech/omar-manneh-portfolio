# Rollback Instructions

## Backup Protection

This repository has a **protected backup** that should NEVER be deleted or overwritten.

### Backup Locations

1. **Branch**: `backup-stable-original`
   - This branch contains the original working version
   - Never force-push to this branch
   - Never delete this branch

2. **Tag**: `v1.0-stable-backup`
   - This tag marks the stable backup point
   - Always use this tag to roll back to the working version

## How to Roll Back

### Option 1: Roll back to backup branch
```bash
git fetch origin
git checkout backup-stable-original
git checkout -b restore-from-backup
# Review changes, then merge to main if needed
```

### Option 2: Roll back to backup tag
```bash
git fetch origin --tags
git checkout v1.0-stable-backup
git checkout -b restore-from-backup
# Review changes, then merge to main if needed
```

### Option 3: Reset main to backup (if needed)
```bash
git fetch origin
git checkout main
git reset --hard origin/backup-stable-original
git push origin main --force  # Only if absolutely necessary
```

## Important Notes

- **NEVER delete** the `backup-stable-original` branch
- **NEVER delete** the `v1.0-stable-backup` tag
- Always create a new branch when testing rollbacks
- Test rollback in a new branch before applying to main

## Current Backup State

- **Backup Created**: Original working version
- **Author**: omar-manneh-tech
- **Email**: omar.manneh.tech@gmail.com
- **Repository**: https://github.com/omar-manneh-tech/omar-manneh-portfolio

