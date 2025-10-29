# NEXORA Platform - Unified Monorepo

## Overview
Unified monorepo containing all NEXORA platform applications and packages.

## Structure
- **apps/**: Applications
  - **web**: Main web application
  - **frontend**: Frontend application
  - **worker**: Cloudflare Worker
  - **agent-tars**: AI Agent system
  - **landing**: Landing page
  - **vitae35**: Vitae35 application
- **packages/**: Shared packages
- **tools/**: Development tools
- **docs/**: Documentation

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+

### Installation
\\\ash
pnpm install
\\\

### Development
\\\ash
# Start all apps in development mode
pnpm dev

# Build all apps
pnpm build

# Run tests
pnpm test

# Lint and typecheck
pnpm verify
\\\

### Scripts
- \pnpm install:ci\: Install dependencies (CI mode)
- \pnpm verify\: Run linting and type checking
- \pnpm build\: Build all applications
- \pnpm dev\: Start development servers
- \pnpm test\: Run all tests
- \pnpm clean\: Clean all build artifacts

## Deployment
- \pnpm predeploy\: Verify and build before deployment
- \pnpm deploy:preview\: Deploy preview to Vercel
- \pnpm deploy\: Deploy to production

## Contributing
See individual app README files for specific development instructions.
