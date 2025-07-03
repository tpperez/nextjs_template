# Next.js Base Template

Production-ready template for building scalable Next.js applications with TypeScript, unified HTTP clients, and development best practices.

**Navigation:** [Architecture Guide](.docs/ARCHITECTURE.md) | [Development Guide](.docs/DEVELOPMENT.md)

---

## Overview

This template provides a complete foundation for Next.js applications with established patterns for data fetching, state management, and code organization. It includes comprehensive tooling for development quality assurance and follows industry best practices for scalability and maintainability.

## Technology Stack

### Core Framework

- **Next.js 15** - React framework with App Router for server-side rendering and routing
- **React 19** - Component-based user interface library
- **TypeScript 5** - Static type checking and enhanced developer experience

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS processing and optimization

### Data Management

- **Unified HTTP Service** - Abstracted REST and GraphQL clients with adapter pattern
- **TanStack Query** - Server state management, caching, and background updates
- **Zustand** - Lightweight global state management for client-side state

### Development & Quality

- **ESLint + Prettier** - Code linting and formatting with strict TypeScript rules
- **Jest + Testing Library** - Unit and integration testing framework
- **Husky + Commitizen** - Git hooks and standardized commit messages

## Quick Start

### Prerequisites

- Node.js (see `.nvmrc` for version)
- npm or yarn

### Setup Instructions

```bash
git clone <repository-url>
cd <project-name>
nvm use
npm install
npm run dev
```

Access application at `http://localhost:3000`

### Environment Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL="https://api.example.com"
```

## Getting Started Guide

### Phase 1: Initial Setup (Day 1)

1. Complete setup instructions above
2. Review project structure below
3. Explore live Pokemon examples at `/pokemons`
4. Verify development environment functionality

### Phase 2: Understanding Patterns (Day 2)

1. Study [Architecture Guide](.docs/ARCHITECTURE.md) for system design
2. Review [Development Guide](.docs/DEVELOPMENT.md) for coding standards
3. Examine `app/views/pokemon-detail/` for complete implementation patterns
4. Understand data flow through routes, queries, and views

### Phase 3: Development Mastery (Week 1)

1. Master HTTP service patterns for API integration
2. Apply testing strategies using provided examples
3. Follow established development workflow
4. Implement first feature using existing patterns

## Project Structure

```
app/
├── (routes)/               # Application routes and pages
│   ├── (public)/           # Public accessible pages
│   ├── (auth)/             # Authentication-protected pages
│   └── api/                # API endpoints
├── components/             # Reusable UI components
│   ├── ui/                 # Basic interface elements
│   └── structure/          # Layout and navigation components
├── views/                  # Complete page views
├── services/               # Global business services
├── stores/                 # Global state management
├── hooks/                  # Shared custom hooks
├── utils/                  # Utility functions
├── constants/              # Application constants
├── typings/                # Global type definitions
└── styles/                 # Global stylesheets

public/                     # Static assets
├── utils/                  # External scripts
└── (assets)/               # Images, documents, etc.

Configuration Files:
├── middleware.ts           # Security and routing middleware
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Implementation Examples

### Data Fetching Patterns

**Server-side Rendering**

- Implementation: `app/(routes)/(public)/pokemons/page.tsx`
- Query organization: `app/(routes)/(public)/pokemons/query/`
- Pattern: Route calls query function, passes data to view

**Client-side Data Fetching**

- Implementation: `app/views/pokemon-detail/pokemon-detail.hook.ts`
- Usage: `app/views/pokemon-detail/components/pokemon-species-info/`
- Pattern: Custom hooks with TanStack Query integration

### HTTP Service Usage

**REST Client Integration**

- Basic usage: `app/(routes)/(public)/pokemons/[name]/query/query.ts`
- Error handling: Structured response format with success/error states
- Configuration: `app/services/http/core/core.ts`

**GraphQL Client Integration**

- Implementation: `app/(routes)/(public)/pokemons/query/query.ts`
- Advanced usage: `app/views/pokemon-detail/pokemon-detail.hook.ts`
- Query definitions: `app/(routes)/(public)/pokemons/query/query.const.ts`

### Component Organization

**Reusable UI Components**

- Location: `app/components/ui/spinner/`
- Structure: Complete module with types, styles, and tests
- Usage: Imported across multiple views and components

**View-specific Components**

- Location: `app/views/pokemon-detail/components/`
- Purpose: Components used only within specific views
- Organization: Grouped by view context

**Complete Module Example**

- Reference: `app/views/pokemon-detail/`
- Includes: Main component, types, constants, hooks, utilities, and sub-components
- Demonstrates: Full module organization pattern

## Quick Actions Reference

### Creating a New View

1. Create directory: `app/views/my-view/`
2. Follow module structure: See [Development Guide](.docs/DEVELOPMENT.md#module-structure)
3. Reference pattern: `app/views/pokemon-detail/`

### Adding API Integration

1. Create query directory: `app/(routes)/my-route/query/`
2. Implement data fetching: Follow existing query patterns
3. Handle errors: Use structured response format

### Component Placement Decision

- **Global usage (3+ modules)**: Place in `app/components/ui/`
- **View-specific usage**: Place in `app/views/[view]/components/`
- **Uncertain**: Start local, promote when reused

## Development Workflow

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run test         # Run complete test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues automatically
npm run tsc          # TypeScript compilation check
```

### Git Workflow

1. Create feature branch: `git checkout -b card-123_feature-name`
2. Implement changes following established patterns
3. Commit using interactive prompts: `git commit`
4. Push and create pull request

All commits trigger automated quality checks including TypeScript validation, tests, linting, and formatting.

## Common Issues and Solutions

### Setup Problems

**Port 3000 already in use**

- Solution: `npm run dev -- -p 3001`

**Node version mismatch**

- Solution: Run `nvm use` and reinstall dependencies

**TypeScript compilation errors**

- Solution: Check `tsconfig.json` configuration and restart VS Code TypeScript service

### Development Issues

**Import path errors**

- Solution: Verify paths start with `@/` and check `tsconfig.json` path mappings

**Test failures**

- Solution: Review `jest.config.ts` and examine working test examples in `app/components/ui/spinner/`

**API integration problems**

- Solution: Check middleware configuration and environment variables

## Documentation Structure

### Architecture Guide

- **Purpose**: System design and architectural decisions
- **Content**: Layer separation, data flow patterns, module organization
- **Audience**: Developers seeking to understand system structure

### Development Guide

- **Purpose**: Coding standards, workflows, and technical reference
- **Content**: TypeScript conventions, testing strategies, HTTP service details
- **Audience**: Developers implementing features and maintaining code

## Success Metrics

### New Team Member Onboarding

- [ ] Complete project setup in under 15 minutes
- [ ] Create first component following established patterns
- [ ] Understand data flow architecture
- [ ] Successfully implement basic feature

### Team Efficiency Indicators

- [ ] Consistent file placement decisions
- [ ] Code reviews focus on logic rather than structure
- [ ] New features follow established patterns
- [ ] Self-service problem resolution

## Contributing Guidelines

1. Fork repository and create feature branch
2. Follow naming convention: `card-123_descriptive-name`
3. Implement changes maintaining existing patterns
4. Ensure all quality checks pass
5. Submit pull request with clear description

### Code Quality Requirements

- TypeScript strict mode compliance
- Test coverage minimum 80%
- Zero ESLint errors
- Prettier formatting applied
- All automated checks passing

## Next Steps

**For immediate development**: Continue to [Development Guide](.docs/DEVELOPMENT.md) for coding standards and workflows.

**For system understanding**: Review [Architecture Guide](.docs/ARCHITECTURE.md) for design decisions and patterns.

**For specific implementation**: Examine the Pokemon examples throughout the codebase for real-world usage patterns.
