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

- **Server-Side Data Fetching:** REST adapter for initial Pokemon data (`queries/get-pokemon-detail.query.ts`)
- **Client-Side Enhancement:** GraphQL adapter for dynamic moves data (`pokemon-detail.hook.ts`)
- **Form Handling:** React Hook Form for Pokemon search functionality (`components/pokemon-search/`)
- **State Management:** Zustand store with persistence (`stores/pokemon-history/`)
- **Component Architecture:** View orchestration with sub-components (`views/pokemon-detail/`)
- **Testing Strategy:** Complete coverage across all layers (`.test.tsx` files)

**Implementation Reference:** `app/views/pokemon-detail/` for complete patterns
**Route Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/` for server-side patterns
**Form Reference:** `app/views/pokemons/components/pokemon-search/` for React Hook Form usage

### Architectural Patterns Demonstrated

**Hybrid Data Strategy:**

- Initial data via server-side REST adapter for SEO optimization
- Dynamic data via client-side GraphQL adapter within TanStack Query for real-time updates
- Multi-layer caching with Next.js ISR and TanStack Query management
- **Client-Side Architecture:** TanStack Query wraps all HTTP adapters for cache and state management

**Form Management:**

- React Hook Form integration for search functionality with validation
- Type-safe form handling with minimal re-renders
- Custom hooks for form state and submission

**Adapter Flexibility:**

- Both REST and GraphQL adapters work universally (server + client)
- Easy switching between fetch/axios/graphql-request implementations
- HTTP adapters execute within TanStack Query's `queryFn` on client-side

---

## Technology Stack

### Foundation

- [Next.js](https://nextjs.org) - React framework with App Router
- [React](https://react.dev) - Component library with hooks
- [TypeScript](https://www.typescriptlang.org) - Type safety and developer experience

### Application Features

- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling framework
- [React Hook Form](https://react-hook-form.com) - Form handling and validation (Pokemon Search example)
- [TanStack Query](https://tanstack.com/query) - Client-side cache and state management layer
- [Zustand](https://zustand-demo.pmnd.rs) - Global state management with persistence

### HTTP Transport Layer (Flexible Implementation)

**Current Defaults:**

- **Fetch API** - Native HTTP transport for both REST and GraphQL adapters

**Available Alternatives:**

- [Axios](https://axios-http.com) - Alternative REST transport implementation
- [GraphQL Request](https://github.com/jasonkuhrt/graphql-request) - Alternative GraphQL transport implementation

**Client-Side Integration:** All HTTP adapters work within TanStack Query's `queryFn` for cache management
**Adapter Switching:** Easy configuration change in `app/services/http/core/core.ts`

### Development Workflow

- [ESLint](https://eslint.org) - Code quality and consistency
- [Prettier](https://prettier.io) - Code formatting and style
- [Vitest](https://vitest.dev) - Fast unit and integration testing
- [Testing Library](https://testing-library.com) - Component testing utilities
- [Conventional Commits](https://www.conventionalcommits.org) - Standardized commit messages
- [Commitizen](https://commitizen-tools.github.io/commitizen) - Interactive commit wizard
- [Husky](https://typicode.github.io/husky) - Git hooks for quality gates
- [Lint-staged](https://github.com/lint-staged/lint-staged) - Pre-commit validation

---

## Quick Start

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm) - Node.js version management
- [Node.js](https://nodejs.org) - Runtime environment
- [npm](https://www.npmjs.com) - Package manager

### Setup Instructions

```bash
git clone <repository-url>
cd <project-name>
nvm use
npm install
npm run dev
```

**Access application:** `http://localhost:3000`
**Try live example:** `http://localhost:3000/pokemons/pikachu`

### Environment Configuration

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL="https://api.example.com"
```

---

## Project Structure

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

Configuration Files:
├── eslint.config.mjs       # code quality rules
├── next.config.ts          # next.js configuration
├── tsconfig.json           # typescript configuration
├── vitest.config.ts        # testing configuration
└── tailwind.config.ts      # styling configuration
```

**Detailed Structure:** See [Development Guide](.docs/DEVELOPMENT.md#code-organization) for complete directory explanation and module patterns.

---

## Available Scripts

```bash
# Development
npm run dev           # start development server with turbopack
npm run dev:debug     # start with debugging enabled

# Production
npm run build         # create production build
npm run start         # start production server
npm run analyze       # analyze bundle size and composition

# Testing
npm run test          # run complete test suite
npm run test:watch    # run tests in watch mode
npm run test:ui       # run tests with UI interface
npm run test:coverage # generate coverage report

# Code Quality
npm run lint          # check code quality and standards
npm run lint:fix      # fix linting issues automatically
npm run format        # check code formatting
npm run format:fix    # fix code formatting issues
npm run tsc           # TypeScript compilation check
```

### Daily Development Commands

```bash
# Start development with comprehensive checking
npm run dev && npm run test:watch

# Code quality verification
npm run lint && npm run tsc && npm run test

# Bundle analysis
npm run analyze
```

---

## Development Workflow

### Quality Assurance Pipeline

The project enforces strict quality standards through automated validation:

**Pre-commit Hooks:**

1. TypeScript compilation verification
2. ESLint code quality checks
3. Prettier formatting validation
4. Test suite execution
5. Conventional commit message validation

**Configuration Files:**

- **ESLint:** `eslint.config.mjs` - Code quality rules
- **Prettier:** `prettier.config.js` - Formatting standards
- **TypeScript:** `tsconfig.json` - Compilation settings
- **Testing:** `vitest.config.ts` - Test environment
- **Git Hooks:** `.husky/` - Pre-commit validation

### Branch Management

**Branch Naming Convention:**

```bash
# With ticket/card number
card-123_pokemon-search-feature

# Without card number
jd_pokemon-detail-optimization
```

### Commit Process

```bash
git add .
git commit  # Opens Commitizen wizard for conventional commits
```

---

## Implementation Guidance

### Architecture Deep Dive

**System Design:** Review [Architecture Guide](.docs/ARCHITECTURE.md) for:

- Layered architecture patterns and responsibilities
- Data fetching strategy with REST/GraphQL adapters
- State management patterns with Zustand
- Component organization and hierarchy
- Performance optimization strategies

### Practical Implementation

**Development Patterns:** See [Development Guide](.docs/DEVELOPMENT.md) for:

- Complete Pokemon Detail implementation walkthrough
- Feature development workflow and best practices
- Testing strategies across all application layers
- Code organization patterns and module structure
- Troubleshooting guide and common solutions

### Getting Started with Examples

1. **Explore Pokemon Detail:** Visit `/pokemons/pikachu` to see all patterns in action
2. **Review Implementation:** Examine `app/views/pokemon-detail/` for complete feature patterns
3. **Study Tests:** Check `.test.tsx` files for testing approaches
4. **Follow Workflow:** Use [Development Guide](.docs/DEVELOPMENT.md) for step-by-step implementation

---

## Contributing Guidelines

### Pull Request Process

1. Create feature branch using naming convention
2. Implement changes following established patterns
3. Ensure all tests pass and coverage thresholds met
4. Use Commitizen for conventional commit messages
5. Submit PR with comprehensive description

### Code Standards

- **TypeScript strict mode** with explicit return types
- **ESLint enforcement** preventing `any` types and ensuring patterns
- **Prettier formatting** for consistent code style
- **Vitest testing** with 80% coverage threshold
- **Conventional commits** for clear change history

### Review Checklist

- [ ] All tests pass locally
- [ ] Code follows established patterns (reference Pokemon Detail)
- [ ] TypeScript compilation successful
- [ ] ESLint validation clean
- [ ] Conventional commit message format
- [ ] PR description includes testing instructions

---

## Support and Documentation

### Technical Documentation

- **[Architecture Guide](.docs/ARCHITECTURE.md)** - System design decisions and implementation patterns
- **[Development Guide](.docs/DEVELOPMENT.md)** - Daily workflows and feature implementation

### External Resources

- **API Documentation:** [https://docs.anthropic.com](https://docs.anthropic.com)
- **Support:** [https://support.anthropic.com](https://support.anthropic.com)
- **Next.js Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs)

---

## Next Steps

**For New Contributors:** Start with [Development Guide](.docs/DEVELOPMENT.md) for coding standards and implementation patterns.

**For Architecture Understanding:** Review [Architecture Guide](.docs/ARCHITECTURE.md) for design decisions and system organization.

**For Hands-On Learning:** Explore Pokemon Detail implementation at `/pokemons/pikachu` and examine corresponding code in `app/views/pokemon-detail/`.
