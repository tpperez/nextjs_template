# Next.js Base Template

Production-ready template for building scalable Next.js applications with TypeScript, unified HTTP clients, and development best practices.

**Navigation:** [Architecture Guide](.docs/ARCHITECTURE.md) | [Development Guide](.docs/DEVELOPMENT.md)

---

## Overview

This template provides a complete foundation for Next.js applications with established patterns for data fetching, state management, and code organization. It includes comprehensive tooling for development quality assurance and follows industry best practices for scalability and maintainability.

---

## Live Implementation Examples

### Pokemon Detail - Complete Feature Demonstration

**Live Example:** [/pokemons/pikachu](http://localhost:3000/pokemons/pikachu)

This working implementation demonstrates every architectural pattern in the template:

- **server-side data fetching:** REST adapter for initial Pokemon data
- **client-side enhancement:** GraphQL adapter for dynamic moves data
- **form handling:** React Hook Form for Pokemon search functionality
- **state management:** Zustand store with persistence
- **component architecture:** View orchestration with sub-components
- **testing strategy:** Complete coverage across all layers

**Implementation Reference:** `app/views/pokemon-detail/` for complete patterns
**Route Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/` for server-side patterns
**Form Reference:** `app/views/pokemons/components/pokemon-search/` for React Hook Form usage

### Architectural Patterns Demonstrated

**Hybrid Data Strategy:**

- initial data via server-side REST adapter for SEO optimization
- dynamic data via client-side GraphQL adapter within TanStack Query for real-time updates
- multi-layer caching with Next.js ISR and TanStack Query management
- **client-side architecture:** TanStack Query wraps all HTTP adapters for cache and state management

**Form Management:**

- React Hook Form integration for search functionality with validation
- type-safe form handling with minimal re-renders
- custom hooks for form state and submission

**Adapter Flexibility:**

- both REST and GraphQL adapters work universally (server + client)
- easy switching between fetch/axios/graphql-request implementations
- HTTP adapters execute within TanStack Query's queryFn on client-side

---

## Technology Stack

### Foundation

- [Next.js](https://nextjs.org/) - react framework with app router
- [TypeScript](https://www.typescriptlang.org/) - type safety and developer experience
- [Tailwind CSS](https://tailwindcss.com/) - utility-first styling framework

### Data Management

- [TanStack Query](https://tanstack.com/query) - server state management and caching
- [Zustand](https://zustand-demo.pmnd.rs/) - client state management with persistence
- [React Hook Form](https://react-hook-form.com/) - performant forms with validation

### HTTP Clients

- **REST Client** (`app/services/http/rest-client.ts`) - fetch-based adapter with error handling
- **GraphQL Client** (`app/services/http/graphql-client.ts`) - graphql-request adapter with caching

### Development Tools

- [Vitest](https://vitest.dev/) - fast unit testing framework
- [ESLint](https://eslint.org/) - code quality and consistency enforcement
- [Prettier](https://prettier.io/) - code formatting automation
- [Commitizen](https://commitizen.github.io/cz-cli/) - conventional commit messages

---

## Quick Start

### Prerequisites

- node.js 18+ with npm package manager

### Setup Instructions

**Reference:** Package scripts configuration in `package.json`

1. clone repository and navigate to project directory
2. use node version specified in `.nvmrc`
3. install dependencies with npm
4. start development server

**Access application:** `http://localhost:3000`
**Try live example:** `http://localhost:3000/pokemons/pikachu`

### Environment Configuration

**Reference:** Environment setup in `.env.example`

create `.env.local` with required environment variables for API integration

---

## Project Structure

**Reference:** Complete directory structure in `app/` folder

```
app/
├── (routes)/               # next.js app router structure
│   ├── (auth)/             # authentication-protected routes
│   ├── (public)/           # publicly accessible routes
│   │   └── (examples)/     # demonstration features (pokemon detail)
│   └── api/                # api route handlers
├── components/             # global reusable components
│   ├── structure/          # layout and navigation
│   └── ui/                 # design system components
├── constants/              # global application constants
├── hooks/                  # global custom react hooks
├── services/               # global business services
│   └── http/               # rest and graphql adapters
├── stores/                 # global state management (zustand)
├── styles/                 # global stylesheets and themes
├── typings/                # global typescript definitions
├── utils/                  # global utility functions
└── views/                  # page orchestrators and business logic

.docs/                      # project documentation
├── ARCHITECTURE.md         # system design and patterns
└── DEVELOPMENT.md          # implementation guide and workflow
```

**Detailed Structure:** See [Development Guide](.docs/DEVELOPMENT.md#code-organization) for complete directory explanation and module patterns.

---

## Available Scripts

**Reference:** All scripts defined in `package.json`

### Development Commands

- **dev server:** start development server with turbopack
- **dev debug:** start with debugging enabled
- **build:** create production build
- **start:** start production server
- **analyze:** analyze bundle size and composition

### Testing Commands

- **test:** run complete test suite
- **test watch:** run tests in watch mode
- **test ui:** run tests with UI interface
- **test coverage:** generate coverage report

### Code Quality Commands

- **lint:** check code quality and standards
- **lint fix:** fix linting issues automatically
- **format:** check code formatting
- **format fix:** fix code formatting issues
- **tsc:** TypeScript compilation check

---

## Development Workflow

### Quality Assurance Pipeline

**Reference:** Configuration files for automated validation

- **ESLint:** `eslint.config.mjs` - code quality rules
- **Prettier:** `prettier.config.js` - formatting standards
- **TypeScript:** `tsconfig.json` - compilation settings
- **Testing:** `vitest.config.ts` - test environment
- **Git Hooks:** `.husky/` - pre-commit validation

### Branch Management

**Reference:** Branch naming conventions in development guidelines

use descriptive branch names following established patterns with optional ticket numbers

### Commit Process

**Reference:** Commitizen configuration for conventional commits

use automated commit wizard for standardized commit message format

---

## Getting Started

### Development Workflow

1. **explore pokemon detail:** visit `/pokemons/pikachu` to see all patterns in action
2. **review implementation:** examine `app/views/pokemon-detail/` for complete feature patterns
3. **study tests:** check `.test.tsx` files for testing approaches
4. **follow workflow:** use [Development Guide](.docs/DEVELOPMENT.md) for step-by-step implementation

---

## Contributing Guidelines

### Pull Request Process

1. create feature branch using naming convention
2. implement changes following established patterns
3. ensure all tests pass and coverage thresholds met
4. use Commitizen for conventional commit messages
5. submit PR with comprehensive description

### Code Standards

- **typescript strict mode** with explicit return types
- **eslint enforcement** preventing `any` types and ensuring patterns
- **prettier formatting** for consistent code style
- **vitest testing** with 80% coverage threshold
- **conventional commits** for clear change history

### Review Checklist

- [ ] all tests pass locally
- [ ] code follows established patterns (reference Pokemon Detail)
- [ ] typescript compilation successful
- [ ] eslint validation clean
- [ ] conventional commit message format
- [ ] PR description includes testing instructions

---

## Support and Documentation

### Technical Documentation

- **[Architecture Guide](.docs/ARCHITECTURE.md)** - system design decisions and implementation patterns
- **[Development Guide](.docs/DEVELOPMENT.md)** - daily workflows and feature implementation

### External Resources

- **API Documentation:** [https://docs.anthropic.com](https://docs.anthropic.com)
- **Support:** [https://support.anthropic.com](https://support.anthropic.com)
- **Next.js Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs)

---

## Next Steps

**For New Contributors:** Start with [Development Guide](.docs/DEVELOPMENT.md) for coding standards and implementation patterns.

**For Architecture Understanding:** Review [Architecture Guide](.docs/ARCHITECTURE.md) for design decisions and system organization.

**For Hands-On Learning:** Explore Pokemon Detail implementation at `/pokemons/pikachu` and examine corresponding code in `app/views/pokemon-detail/`.
