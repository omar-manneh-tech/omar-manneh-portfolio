# Professional Portfolio Platform - Enterprise-Grade

A production-ready, enterprise-grade portfolio web application that includes:
1. **Public Developer Portfolio** - Marketing site showcasing the developer/product
2. **Professional Portfolio Platform (PFP)** - A secure platform for civil servants, NGO staff, and professionals to create verified, shareable digital portfolios

## 🏗️ Architecture

- **Frontend**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS
- **Backend**: NestJS + TypeScript + PostgreSQL
- **Database**: PostgreSQL with audit logging and triggers
- **File Storage**: AWS S3 (or S3-compatible)
- **Authentication**: NextAuth.js + JWT with refresh tokens
- **Deployment**: Docker, Vercel (frontend), Railway/AWS (backend)

## 📁 Project Structure

```
├─ frontend/          # Next.js application
├─ backend/           # NestJS API
├─ infra/             # Terraform, Docker configs
├─ scripts/           # Seed, backup, restore scripts
└─ .github/workflows/ # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL 14+
- Docker (optional, for containerized setup)
- AWS account (for S3)

### Local Development

1. **Clone and install dependencies:**
   ```bash
   # Install root dependencies (if using workspace)
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example env files
   cp frontend/.env.example frontend/.env.local
   cp backend/.env.example backend/.env
   ```

3. **Set up database:**
   ```bash
   cd backend
   npm run migration:run
   npm run seed
   ```

4. **Start services:**
   ```bash
   # Terminal 1: Frontend
   cd frontend && npm run dev
   
   # Terminal 2: Backend
   cd backend && npm run start:dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - API Docs: http://localhost:4000/api

## 🔐 Security Features

- ✅ RBAC (Role-Based Access Control)
- ✅ Admin MFA (TOTP)
- ✅ Rate limiting & brute-force protection
- ✅ Input validation (Zod)
- ✅ Audit logging (tamper-evident)
- ✅ HTTPS/HSTS
- ✅ Security headers (CSP, X-Frame-Options, etc.)
- ✅ Secrets management via environment variables

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && npm test

# E2E tests
npm run test:e2e
```

## 📊 Performance Targets

- Lighthouse Performance: ≥ 90
- LCP: < 1.2s
- FID: < 100ms
- CLS: < 0.1

## 📚 Documentation

- [API Documentation](./backend/docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Security Report](./docs/SECURITY.md)
- [Backup & Restore](./docs/BACKUP_RESTORE.md)

## 🛠️ Tech Stack

### Frontend
- Next.js 14+ (App Router, React Server Components)
- TypeScript (strict mode)
- Tailwind CSS
- Framer Motion (animations)
- NextAuth.js

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- AWS SDK (S3)

### DevOps
- Docker
- GitHub Actions
- Terraform (optional)

## 📝 License

Proprietary - All rights reserved

## 👥 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## 📚 Documentation

- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Security Report](./docs/SECURITY.md)
- [Backup & Restore](./docs/BACKUP_RESTORE.md)

