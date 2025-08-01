# Development Scripts

Available npm scripts for development workflow automation and quality assurance.

## Table of Contents

- [Overview](#overview)
- [Environment Setup](#environment-setup)
- [Development Scripts](#development-scripts)
- [Code Quality Scripts](#code-quality-scripts)
- [Testing Scripts](#testing-scripts)

## Related Documentation

- **[Contributing](./contributing.md)** - Development workflow and script usage guidelines
- **[Code Quality](./code-quality.md)** - Quality assurance commands and automation
- **[Testing](./testing.md)** - Test execution commands and framework scripts

---

## Overview

This document provides a reference for all available npm scripts used throughout the development workflow, from initial environment setup to production deployment and quality assurance.

#### Script Categories

- **Environment Setup**: Node version management and dependency installation
- **Development**: Local development server and build processes
- **Code Quality**: Linting, formatting, and type checking tools
- **Testing**: Test execution, coverage, and interactive testing interfaces

#### Development Philosophy

All scripts are designed to provide consistent development experience across different environments while maintaining code quality standards through automated tooling and validation processes.

For npm scripts best practices, refer to the [npm scripts documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts).

---

## Environment Setup

```bash
# Install Node.js version from .nvmrc file
nvm install && nvm use

# Install project dependencies
npm install
```

#### Environment Management

- Use [nvm](https://github.com/nvm-sh/nvm) for Node.js version management
- Ensure consistent Node.js versions across team members
- Follow [Node.js best practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp) for environment setup

---

## Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Create optimized production build
npm run build

# Analyze bundle size and dependencies
npm run analyze

# Start production server locally
npm run start
```

**Development Workflow:**

- **dev**: Runs the development server with hot module replacement
- **build**: Creates optimized production bundle with minification
- **analyze**: Generates bundle analysis reports for optimization insights
- **start**: Serves the production build for local testing

For framework-specific development patterns, consult your framework's documentation for development server configuration.

---

## Code Quality Scripts

```bash
# TypeScript type checking across codebase
npm run tsc

# Lint code for quality and consistency
npm run lint

# Auto-fix linting issues where possible
npm run lint:fix

# Check code formatting without modifications
npm run format

# Format code using configured formatter
npm run format:fix
```

**Quality Assurance:**

- **tsc**: Validates TypeScript types without building - see [TypeScript compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- **lint**: Identifies code quality issues - configure with [ESLint rules](https://eslint.org/docs/latest/rules/)
- **lint:fix**: Automatically resolves fixable linting violations
- **format**: Validates formatting without making changes - customize with [Prettier options](https://prettier.io/docs/en/options.html)
- **format:fix**: Applies consistent code formatting

---

## Testing Scripts

```bash
# Execute test suite
npm run test

# Run tests in watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Open interactive testing interface
npm run test:ui
```

---

## References

| Resource                                                                                          | Description                                                 |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [npm Scripts Documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts)                      | Official npm documentation for writing and managing scripts |
| [NVM](https://github.com/nvm-sh/nvm)                                                              | Node Version Manager for handling multiple Node.js versions |
| [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)                  | Official Node.js guide for environment setup and deployment |
| [TypeScript Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) | Complete reference for TypeScript configuration             |
| [ESLint Rules](https://eslint.org/docs/latest/rules/)                                             | Complete list of available ESLint rules                     |
| [Prettier Options](https://prettier.io/docs/en/options.html)                                      | Configuration options for Prettier code formatter           |
