# Next.js Base Template

Production-ready template for building scalable Next.js applications with TypeScript, unified HTTP clients, and development best practices.

**Navigation:** [Architecture Guide](.docs/ARCHITECTURE.md) | [Development Guide](.docs/DEVELOPMENT.md)

---

## Overview

This template provides a complete foundation for Next.js applications with established patterns for data fetching, state management, and code organization. It includes comprehensive tooling for development quality assurance and follows industry best practices for scalability and maintainability.

---

## Technology Stack

### Foundation

- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)

### Application Features

- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs)
- [Axios](https://axios-http.com)
- [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)

### Development Workflow

- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Vitest](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Conventional Commits](https://www.conventionalcommits.org)
- [Commitizen](https://commitizen-tools.github.io/commitizen)
- [Husky](https://typicode.github.io/husky)
- [Lint-staged](https://github.com/lint-staged/lint-staged)

---

## Quick Start

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm)
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com)

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
│   ├── (auth)/             # authentication-protected pages
│   ├── (public)/           # public accessible pages
│   └── api/                # api endpoints
├── components/             # global reusable components
│   ├── structure/          # structure components
│   └── ui/                 # ui components
├── constants/              # global constants
├── hooks/                  # global custom hooks
├── services/               # global business services
├── stores/                 # global state management
├── styles/                 # global stylesheets
├── typings/                # global type definitions
├── utils/                  # global utility functions
└── views/                  # page orchestrators

public/                     # next.js public directory
.vscode/                    # vscode configuration directory
├── extensions.json         # recommended vscode extensions
└── settings.json           # vscode editor settings

eslint.config.mjs           # code quality and linting configuration
middleware.ts               # security and routing middleware configuration
next.config.ts              # next.js framework configuration
package.json                # dependencies and scripts configuration
tsconfig.json               # typescript compiler configuration
vitest.config.ts            # testing framework configuration
vitest.setup.ts             # test environment setup configuration
.editorconfig               # editor formatting standards configuration
.gitignore                  # git exclusions configuration
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

## Development Workflow

### Daily Development Commands

```bash
# development
npm run dev                 # start with hot reload
npm run test:watch          # run tests in watch mode
npm run lint && npm run tsc # check code quality

# troubleshooting
npm run dev -- --port 3001 # use different port
rm -rf .next && npm run dev # clear cache
```

### Code Quality Standards

The project maintains strict code quality through:

- **TypeScript strict mode** with explicit return types
- **ESLint rules** preventing `any` types and enforcing patterns
- **Prettier formatting** for consistent code style
- **Vitest testing** with 80% coverage threshold
- **Conventional commits** for clear change history

---

## Contributing Guidelines

### Branch Management

**Branch Naming Convention:**

```bash
# with card/ticket number
card-123_pokemon-search-feature

# without card number
jd_pokemon-detail-optimization
```

### Commit Process

```bash
git add .
git commit  # opens commitizen wizard
```

**Pre-commit Validation Pipeline:**

The project enforces quality through automated hooks that validate:

1. TypeScript compilation
2. Test suite execution
3. ESLint validation
4. Prettier formatting
5. Conventional commit messages via Commitizen

### Pull Request Guidelines

Use the provided PR template and ensure:

- Self-review completed
- Tests added for core features
- All tests pass locally
- Proper tags applied
- Reviewer assigned

---

## Documentation

- **[Development Guide](.docs/DEVELOPMENT.md)** - daily workflows and implementation patterns
- **[Architecture Guide](.docs/ARCHITECTURE.md)** - design decisions and system architecture

---

## Next Steps

**For new contributors:** Review the [Development Guide](.docs/DEVELOPMENT.md) for coding standards and implementation patterns.

**For architecture decisions:** See the [Architecture Guide](.docs/ARCHITECTURE.md) for design rationale and system organization.

**For implementation examples:** Examine `app/views/pokemon-detail/` for complete feature patterns.
