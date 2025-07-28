# Development Tools

Available npm scripts for development workflow.

## Table of Contents

- [Overview](#overview)
- [Environment Setup](#environment-setup)
- [Development Scripts](#development-scripts)
- [Code Quality Scripts](#code-quality-scripts)
- [Testing Scripts](#testing-scripts)

---

## Overview

This document provides a comprehensive reference for all available npm scripts used throughout the development workflow, from initial environment setup to production deployment and quality assurance.

**Script Categories:**

- **Environment Setup**: Node version management and dependency installation
- **Development**: Local development server and build processes
- **Code Quality**: Linting, formatting, and type checking tools
- **Testing**: Test execution, coverage, and interactive testing interfaces

**Development Philosophy:**
All scripts are designed to provide consistent development experience across different environments while maintaining code quality standards through automated tooling and validation processes.

---

## Environment Setup

```bash
# install node version from .nvmrc
nvm install && nvm use

# install dependencies
npm install
```

---

## Development Scripts

```bash
# start development server with turbopack
npm run dev

# create production build
npm run build

# create production build with bundle analysis
npm run analyze

# start production server
npm run start
```

---

## Code Quality Scripts

```bash
# typescript type check
npm run tsc

# lint code
npm run lint

# lint with auto-fix
npm run lint:fix

# format code
npm run format:fix

# check formatting
npm run format
```

---

## Testing Scripts

```bash
# run tests
npm run test

# test watch mode
npm run test:watch

# test coverage report
npm run test:coverage

# test interactive ui
npm run test:ui
```
