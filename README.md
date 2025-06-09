# Next.js Project Documentation

> 📦 **Base template for creating new Next.js applications.** Pre-configured with TypeScript, Tailwind CSS, testing setup, and development tools.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-cyan?logo=tailwindcss)
![Jest](https://img.shields.io/badge/Jest-red?logo=jest)

---

## 📋 Table of Contents

- [📋 Overview](#-overview)
- [⚡ Setup](#-setup)
- [💻 Development](#-development)
- [📚 Reference](#-reference)

---

## 📋 Overview

### Tech Stack

#### Core Framework

- **Next.js** - React framework with App Router
- **React** - UI library with latest features
- **TypeScript** - Type safety and enhanced DX
- **Tailwind CSS** - Utility-first styling

#### State Management

- **Zustand** - Global state management (lightweight)
- **React Hooks** - Local component state (useState, useReducer)

#### Quality & Testing

- **ESLint** - Code linting and quality rules
- **Prettier** - Automated code formatting
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities

#### Development Tools

- **Husky** - Git hooks automation
- **Commitizen** - Conventional commits wizard
- **Lint-staged** - Run linters on staged files
- **Turbopack** - Fast Next.js bundler

### Essential Documentation

| Documentation                                                  | Description                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| **[📁 Project Organization](./.docs/project-organization.md)** | **WHERE** to place files, folder structure, architectural overview |
| **[📝 Code Standards](./.docs/code-standards.md)**             | **HOW** to write code, naming patterns, quality standards          |

---

## ⚡ Setup

### Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Node.js 22.15.1+ (see .nvmrc)
- npm
- git

### Quick Start

```bash
# 1. Clone and setup
git clone git@github.com:username/repository-name.git
cd [your-new-project-name]
nvm use

# 2. Install dependencies
npm install

# 3. Start development
npm run dev
# Access: http://localhost:3000
```

### Environment Setup

Create `.env.local`:

```env
# Public variables (accessible in browser)
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_APP_NAME="My App"

# Private variables (server-only)
MY_SECRET_KEY="your-secret-here"
MY_DATABASE_URL="your-database-connection-string"
```

📚 **Learn more:** [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

### Available Scripts

#### Development

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm start           # Start production server
```

#### Code Quality

```bash
npm run lint         # Check linting issues
npm run lint:fix     # Fix linting issues automatically
npm run format       # Check code formatting
npm run format:fix   # Format code automatically
npm run tsc         # TypeScript type checking
```

#### Testing

```bash
npm test            # Run all tests
npm run test:watch  # Run tests in watch mode
```

---

## 💻 Development

### Testing

Jest comes pre-configured with React Testing Library.

```bash
# Run tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm test -- --coverage
```

**Learn more:** [Jest Documentation](https://jestjs.io/docs/getting-started) | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Git Workflow

#### Basic Workflow

```bash
# 1. Create feature branch
git checkout -b card-123_your-feature-name

# 2. Make changes and commit (Commitizen opens automatically)
git add .
git commit  # Interactive wizard opens via Husky

# 3. Push and create PR
git push origin card-123_your-feature-name
```

#### Branch Naming Convention

Use descriptive names with `card-xx_` prefix:

```bash
card-123_user-authentication
card-456_dashboard-ui
card-789_payment-integration
```

**Pattern:** `card-xx_descriptive-name` (always lowercase)

> 💡 **No card available?** Use your initials: `js_feature-name` (João Silva)

#### Commit Types

This template uses **Conventional Commits** standard for consistent commit messages.

**Learn more:** [Conventional Commits](https://www.conventionalcommits.org/) | [Commitizen](https://github.com/commitizen/cz-cli)

#### Automated Quality Checks

Husky runs these checks on every commit:

- ✅ **TypeScript** - Type checking (`npm run tsc`)
- ✅ **Tests** - All tests must pass (`npm test`)
- ✅ **ESLint** - Code quality and linting (`npx lint-staged`)
- ✅ **Prettier** - Code formatting (via lint-staged)
- ✅ **Commit message** - Conventional format (`commitlint`)

---

## 📚 Reference

### Contributing

**Want to improve the template?**

- 🐛 **[Report bugs](https://github.com/your-repo/issues)**
- 💡 **[Suggest features](https://github.com/your-repo/issues)**
- 🔧 **[Submit PRs](https://github.com/your-repo/pulls)**

#### Quick Setup for Contributors

```bash
# Fork and clone
git clone https://github.com/your-username/your-fork.git
cd your-fork && nvm use && npm install

# Create feature branch
git checkout -b card-456_your-contribution

# Make changes and commit
git add . && git commit  # Commitizen opens
git push origin card-456_your-contribution
```

#### Pull Request Checklist

- ✅ **Tests pass** - `npm test`
- ✅ **Types check** - `npm run tsc`
- ✅ **Linting passes** - `npm run lint`
- ✅ **Code formatted** - `npm run format`
- ✅ **Conventional commits** - Use `git commit` (Commitizen)
- ✅ **Documentation updated** - If adding new patterns or features
