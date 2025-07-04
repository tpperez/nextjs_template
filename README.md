# Next.js Base Template

Production-ready template for building scalable Next.js applications with TypeScript, unified HTTP clients, and development best practices.

**Navigation:** [Architecture Guide](.docs/ARCHITECTURE.md) | [Development Guide](.docs/DEVELOPMENT.md)

---

## Overview

This template provides a complete foundation for Next.js applications with established patterns for data fetching, state management, and code organization. It includes comprehensive tooling for development quality assurance and follows industry best practices for scalability and maintainability.

---

## Technology Stack

### Foundation

- Next.js
- React
- TypeScript

### Application Features

- Tailwind CSS
- React Hook Form
- TanStack Query
- Zustand
- Axios & GraphQL Request

### Developer Workflow

- ESLint + Prettier
- Vitest + Testing Library
- Husky + Lint-staged
- Commitizen

---

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

---

## Project Structure

```
app/
├── (routes)/               # application routes and pages
│   ├── (public)/           # public accessible pages
│   ├── (auth)/             # authentication-protected pages
│   └── api/                # api endpoints
├── components/             # reusable ui components
│   ├── ui/                 # basic interface elements
│   └── structure/          # layout and navigation components
├── views/                  # complete page views
├── services/               # global business services
├── stores/                 # global state management
├── hooks/                  # shared custom hooks
├── utils/                  # utility functions
├── constants/              # application constants
├── typings/                # global type definitions
└── styles/                 # global stylesheets

public/                     # next.js public directory

Configuration Files:
├── middleware.ts           # security and routing middleware
└── next.config.js          # next.js configuration
```

---

## Available Scripts

```bash
npm run dev           # start development server with turbopack
npm run build         # create production build
npm run start         # start production server
npm run analyze       # analyze bundle size and composition
npm run test          # run complete test suite
npm run test:watch    # run tests in watch mode
npm run test:ui       # run tests with UI interface
npm run test:coverage # generate coverage report
npm run lint          # check code quality
npm run lint:fix      # fix linting issues automatically
npm run format        # check code formatting
npm run format:fix    # fix code formatting
npm run tsc           # typescript compilation check
```

---

## Implementation Examples

### Basic Data Fetching (Beginner)

**REST API Integration:** Explore `app/(routes)/(public)/(examples)/pokemons/` for server-side data fetching patterns

**Key Learning Points:**

- Server Component data fetching
- Error handling and loading states
- Type-safe API responses

### Advanced State Management (Intermediate)

**Global State Example:** Review `app/stores/pokemon-history/` for Zustand implementation patterns

**Client-Side Integration:** Examine `app/views/pokemon-detail/pokemon-detail.tsx` for local state with global store interaction

### Complete Feature Implementation (Advanced)

**Full Stack Pattern:** Study `app/views/pokemon-detail/` directory structure for comprehensive module organization

**Architecture Application:** See how layered architecture principles are applied in practice

---

## Documentation Structure

### [Architecture Guide](.docs/ARCHITECTURE.md)

- **Purpose**: system design and architectural decisions
- **Content**: layer separation, data flow patterns, module organization
- **Audience**: developers seeking to understand system structure

### [Development Guide](.docs/DEVELOPMENT.md)

- **Purpose**: coding standards, workflows, and technical reference
- **Content**: typescript conventions, testing strategies, http service details
- **Audience**: developers implementing features and maintaining code

---

## Success Metrics

### Documentation Effectiveness

Target metrics for measuring documentation success:

- **Onboarding Time:** New team members productive within 15 minutes
- **Self-Service Rate:** 80% of development questions answerable through documentation
- **Pattern Consistency:** Consistent architectural patterns across all new features
- **Code Review Efficiency:** Reviews focus on business logic rather than structural questions

### Development Quality

Automated quality validation ensures:

- **Type Safety:** 100% TypeScript strict mode compliance
- **Code Coverage:** Minimum 80% test coverage for new features
- **Performance:** Core Web Vitals compliance maintained
- **Build Reliability:** Zero-error tolerance in main branch

---

## Next Steps

**For immediate development**: Continue to [Development Guide](.docs/DEVELOPMENT.md) for coding standards and workflows.

**For system understanding**: Review [Architecture Guide](.docs/ARCHITECTURE.md) for design decisions and patterns.

**For specific implementation**: Examine the Pokemon examples throughout the codebase for real-world usage patterns.
