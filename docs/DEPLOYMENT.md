# Deployment Guide

This guide covers deployment procedures for the Professional Portfolio Platform.

## Prerequisites

- Docker and Docker Compose (for containerized deployment)
- PostgreSQL 14+ database
- AWS account (for S3 storage)
- Domain name (for production)
- SSL certificate (Let's Encrypt recommended)

## Environment Setup

### Backend Environment Variables

Create `backend/.env` with:

```env
NODE_ENV=production
PORT=4000
APP_URL=https://api.yourdomain.com

DATABASE_URL=postgresql://user:password@host:5432/portfolio_db?schema=public

JWT_SECRET=your-secure-jwt-secret-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-secure-refresh-secret-min-32-chars
JWT_REFRESH_EXPIRES_IN=7d

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
S3_BUCKET_DOMAIN=https://your-bucket.s3.amazonaws.com

CORS_ORIGIN=https://yourdomain.com

SENTRY_DSN=your-sentry-dsn
```

### Frontend Environment Variables

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api

NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret

NEXT_PUBLIC_S3_BUCKET=your-bucket-name
NEXT_PUBLIC_S3_REGION=us-east-1

NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## Database Setup

1. **Create database:**
   ```bash
   createdb portfolio_db
   ```

2. **Run migrations:**
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

3. **Seed database (optional):**
   ```bash
   npm run seed
   ```

4. **Run audit triggers:**
   ```bash
   psql -d portfolio_db -f prisma/migrations/audit_triggers.sql
   ```

## Docker Deployment

### Using Docker Compose

1. **Update docker-compose.yml** with production environment variables

2. **Build and start:**
   ```bash
   docker-compose up -d
   ```

3. **Run migrations:**
   ```bash
   docker-compose exec backend npm run migration:run
   ```

4. **Seed database:**
   ```bash
   docker-compose exec backend npm run seed
   ```

### Individual Containers

1. **Build backend:**
   ```bash
   cd backend
   docker build -t portfolio-backend .
   ```

2. **Build frontend:**
   ```bash
   cd frontend
   docker build -t portfolio-frontend .
   ```

## Vercel Deployment (Frontend)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set environment variables** in Vercel dashboard

## Railway Deployment (Backend)

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Initialize and deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set environment variables** in Railway dashboard

## AWS ECS Deployment

1. **Build and push Docker images:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
   docker build -t portfolio-backend ./backend
   docker tag portfolio-backend:latest your-account.dkr.ecr.us-east-1.amazonaws.com/portfolio-backend:latest
   docker push your-account.dkr.ecr.us-east-1.amazonaws.com/portfolio-backend:latest
   ```

2. **Update ECS service** with new image

## Post-Deployment Checklist

- [ ] Verify HTTPS is working
- [ ] Test authentication flows
- [ ] Verify database connections
- [ ] Test file uploads to S3
- [ ] Verify audit logging is working
- [ ] Check security headers
- [ ] Set up monitoring (Sentry)
- [ ] Configure backup schedules
- [ ] Set up rate limiting
- [ ] Test MFA for admin users

## Monitoring

- Set up Sentry for error tracking
- Configure health check endpoints
- Set up uptime monitoring
- Monitor database performance
- Track API response times

## Rollback Procedure

1. **Identify last stable version**
2. **Update docker-compose.yml** or ECS task definition
3. **Redeploy with previous image tag**
4. **Verify functionality**
5. **Investigate issue in non-production environment**

