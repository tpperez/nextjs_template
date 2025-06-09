# Next.js Project Documentation

> 📦 **Complete Next.js starter template with pre-configured tools and scalable architecture.** Build production-ready applications with TypeScript, Tailwind CSS, automated testing, and quality standards that scale with your team.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-cyan?logo=tailwindcss)
![Jest](https://img.shields.io/badge/Jest-red?logo=jest)

> 📦 **See exact versions in [`package.json`](./package.json)**

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✅ Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📋 Complete Documentation](#-complete-documentation)
- [🔧 Available Scripts](#-available-scripts)
- [🛠 Tech Stack](#-tech-stack)
- [🤝 Development](#-development)
- [🔧 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)

---

## 🎯 Overview

**Next.js starter template** with pre-configured tools and scalable architecture for building modern web applications.

### Key Features

- ⚡ **Next.js 15** - App Router + Turbopack for fast development
- 🎨 **Tailwind CSS 4** - Utility-first styling with latest features
- 📱 **TypeScript** - Complete type safety and developer experience
- 🗃️ **Zustand** - Lightweight global state management
- 🧪 **Jest + Testing Library** - Comprehensive testing setup
- 📏 **ESLint + Prettier** - Automated code quality and formatting
- 🎯 **Conventional Commits** - Commitizen for consistent git history
- 🏗️ **Scalable Architecture** - Organized folder structure and patterns

---

## ✅ Prerequisites

- [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Node.js 22.15.1+ (see .nvmrc)
- npm
- git

---

## 🚀 Quick Start

```bash
# 1. Clone and setup
git clone [template-repository-url]
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
# Public variables
NEXT_PUBLIC_API_URL="https://api.example.com"
NEXT_PUBLIC_APP_NAME="My App"

# Private variables
MY_SECRET_KEY="your-secret-here"
MY_DATABASE_URL="your-database-connection-string"
```

📚 **Learn more about environment variables:** [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## 📋 Complete Documentation

### 🎯 Core Organization & Standards

| Documentation                                                  | Description                                               |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| **[📁 Project Organization](./.docs/project-organization.md)** | **WHERE** to place files, folder structure, workflow      |
| **[📝 Code Standards](./.docs/code-standards.md)**             | **HOW** to write code, naming patterns, quality standards |

### 📚 Implementation & Processes

| Documentation                                             | Description                                       |
| --------------------------------------------------------- | ------------------------------------------------- |
| **[🏗️ Architecture & Concepts](./.docs/architecture.md)** | Components vs Views, data flow, design principles |
| **[📚 Practical Examples](./.docs/examples.md)**          | Complete implementation examples for all patterns |
| **[🧪 Testing](./.docs/testing.md)**                      | Jest setup, testing strategies, examples          |
| **[🔄 Workflows & Best Practices](./.docs/workflows.md)** | Git flow, commits, team collaboration             |

### 🚀 Quick Start Guide

**New to this template?** Follow this reading order:

1. **[📁 Project Organization](./.docs/project-organization.md)** → Learn **WHERE** to put your code
2. **[📝 Code Standards](./.docs/code-standards.md)** → Learn **HOW** to write quality code
3. **[📚 Practical Examples](./.docs/examples.md)** → See complete implementation patterns
4. **[🧪 Testing](./.docs/testing.md)** → Set up testing for your features

### 💡 Quick Reference

- 🤔 **"Where should I put this file?"** → [Project Organization](./.docs/project-organization.md)
- 🤔 **"How should I name this?"** → [Code Standards](./.docs/code-standards.md)
- 🤔 **"How do I implement this pattern?"** → [Practical Examples](./.docs/examples.md)

---

## 🔧 Available Scripts

### Development

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm start           # Start production server
```

### Code Quality

```bash
npm run lint         # Check issues
npm run lint:fix     # Fix issues
npm run format       # Check formatting
npm run format:fix   # Format code
npm run tsc         # TypeScript check
```

### Testing

```bash
npm test            # Run tests
npm run test:watch  # Watch mode
```

### Git and Commits

```bash
git commit          # Commitizen opens (Husky)
```

---

## 🛠 Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5** - Type safety and better DX
- **Tailwind CSS 4** - Utility-first styling

### State & Data

- **Zustand** - Global state management
- **React Hooks** - Local component state

### Quality & Testing

- **ESLint** - Code linting and conventions
- **Prettier** - Code formatting
- **Jest** - Unit testing framework
- **Testing Library** - React component testing

### Development

- **Husky** - Git hooks automation
- **Commitizen** - Conventional commits
- **Turbopack** - Fast Next.js bundler

---

## 🤝 Development

This template enforces consistent patterns:

- 🏹 **Arrow functions only** (ESLint enforced)
- 📝 **Strict naming conventions** (kebab-case, PascalCase, I/T prefixes)
- 🎣 **Custom hooks for logic** (global in `/hooks/`, specific as `.hook.ts`)
- 🧪 **Comprehensive testing** (all modules tested)
- 🔄 **Conventional commits** (Commitizen + Husky)
- 🌿 **Structured git flow** (`[CARD-ID]_[description]`)

### Code Organization

| **WHERE** to place code                                    | **HOW** to write code                          |
| ---------------------------------------------------------- | ---------------------------------------------- |
| [📁 Project Organization](./.docs/project-organization.md) | [📝 Code Standards](./.docs/code-standards.md) |
| Folder structure, module placement                         | Naming conventions, implementation patterns    |

> 📚 **Learn the patterns:** See [Code Standards](./.docs/code-standards.md) and [Practical Examples](./.docs/examples.md)

---

## 🔧 Troubleshooting

### Common Issues

**Node version:**

```bash
nvm use
```

**Cache issues:**

```bash
rm -rf node_modules package-lock.json .next .turbo
npm install
npm run dev
```

**Port in use:**

```bash
npm run dev -- -p 3001
```

**TypeScript errors:**

```bash
npm run tsc
```

---

## 🤝 Contributing

**Found issues or want to improve?**

- 🐛 **[Report bugs](https://github.com/your-repo/issues)**
- 💡 **[Suggest features](https://github.com/your-repo/issues)**
- 🔧 **[Submit PRs](https://github.com/your-repo/pulls)**

**Before contributing:**

1. Read [Project Organization](./.docs/project-organization.md) - **WHERE** to place code
2. Read [Code Standards](./.docs/code-standards.md) - **HOW** to write code
3. Follow [Workflows](./.docs/workflows.md) - Git flow and collaboration
4. Add tests for features - See [Testing Guide](./.docs/testing.md)
