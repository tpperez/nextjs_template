# Contributing Guidelines

Development workflow specifications and standards for contributing to this project.

## Table of Contents

- [Overview](#overview)
- [Development Environment Setup](#development-environment-setup)
- [Development Workflow](#development-workflow)
- [Code Quality Standards](#code-quality-standards)
- [Pull Request Requirements](#pull-request-requirements)
- [Commit Standards](#commit-standards)
- [Testing Guidelines](#testing-guidelines)
- [Code Standards](#code-standards)
- [Documentation Standards](#documentation-standards)
- [Issue Reporting](#issue-reporting)
- [Support and Communication](#support-and-communication)

---

## Overview

This document defines the development workflow specifications and standards for contributing to this project, ensuring consistent code quality, maintainable architecture, and effective collaboration across all team members.

**Core Principles:**

- Automated quality assurance through pre-commit hooks and CI/CD
- Conventional commit standards for clear project history
- Comprehensive testing coverage with minimum 80% threshold
- TypeScript-first development with strict type checking

**Quality Philosophy:**
All contributions undergo automated quality checks and peer review to maintain high standards while supporting developer productivity through established tooling and clear guidelines.

---

## Development Environment Setup

### Prerequisites

- node.js via nvm (version specified in .nvmrc)
- npm (included with node.js)

### Initial Setup

```bash
# install and activate node version
nvm install
nvm use

# install dependencies
npm install

# verify setup
npm run test
npm run lint
npm run tsc
```

---

## Development Workflow

### Branch Strategy

- main branch contains production-ready code
- feature branches follow naming pattern: feature/descriptive-name
- bug fix branches follow pattern: fix/descriptive-name
- hotfix branches follow pattern: hotfix/descriptive-name

### Development Process

```bash
# start development server with turbopack
npm run dev

# run tests in watch mode during development
npm run test:watch

# type checking during development
npm run tsc

# format code automatically
npm run format:fix

# lint and auto-fix issues
npm run lint:fix
```

---

## Code Quality Standards

### Automated Quality Checks

Pre-commit hooks automatically run:

- typescript compilation check
- test execution
- linting with automatic fixes
- code formatting with prettier

### Manual Quality Verification

```bash
# run full test suite with coverage
npm run test:coverage

# format check without modifications
npm run format

# lint check without fixes
npm run lint

# bundle analysis for performance optimization
npm run analyze
```

---

## Pull Request Requirements

### Before Submitting

- ensure all tests pass locally
- verify typescript compilation succeeds
- run linting and formatting tools
- update documentation if necessary
- include test coverage for new functionality

### Pull Request Format

- descriptive title following conventional commit format
- clear description of changes and motivation
- reference related issues when applicable
- include screenshots for ui changes

### Review Process

- automated ci checks must pass
- at least one code review approval required
- documentation updates reviewed for accuracy
- performance impact assessed for significant changes

---

## Commit Standards

### Conventional Commits

Follow conventional commit specification for all commit messages:

```bash
# feature additions
feat: add user authentication system

# bug fixes
fix: resolve navigation menu overflow issue

# documentation updates
docs: update api integration guidelines

# code style changes
style: apply consistent formatting to components

# refactoring without feature changes
refactor: simplify data fetching logic

# test additions or modifications
test: add coverage for form validation

# build process or dependency updates
chore: update react to version 19.1.0
```

### Commit Message Format

```
type(scope): description

detailed explanation of changes when necessary

- key changes or considerations
- impact on existing functionality
- references to issues or documentation
```

---

## Testing Guidelines

### Test File Organization

- unit tests: component.test.tsx
- hook tests: hook-name.hook.test.ts
- integration tests: feature-name.integration.test.ts
- test utilities: shared testing setup and mocks

### Testing Standards

- maintain minimum 80% code coverage
- test public apis and user interactions
- mock external dependencies appropriately
- follow testing library best practices

### Test Execution

```bash
# run all tests
npm run test

# watch mode for active development
npm run test:watch

# coverage report generation
npm run test:coverage

# interactive test ui
npm run test:ui
```

---

## Code Standards

### TypeScript Configuration

- strict type checking enabled
- explicit return types for public functions
- proper interface definitions for data structures
- effective use of generic types when appropriate

### Naming Conventions

Reference naming-conventions.md for detailed standards:

- components: PascalCase with descriptive names
- hooks: camelCase starting with 'use'
- utilities: camelCase with clear purpose indication
- constants: UPPER_SNAKE_CASE for module-level constants

### Component Structure

```typescript
interface ComponentProps {
  // prop definitions with proper types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // component implementation
  return <div>component content</div>
}

export default Component
```

---

## Documentation Standards

### Code Documentation

- jsDoc comments for public functions and complex logic
- readme files for major features or modules
- inline comments for business logic explanations
- type definitions serve as primary api documentation

### Documentation Updates

- update relevant docs with feature changes
- maintain accuracy of examples and code samples
- review cross-references between documentation files
- ensure consistency with established writing guidelines

---

## Issue Reporting

### Bug Reports

Include the following information:

- steps to reproduce the issue
- expected versus actual behavior
- environment details (browser, node version, etc.)
- relevant error messages or console output
- screenshots or screen recordings when helpful

### Feature Requests

Provide context for new features:

- use case description and user value
- proposed implementation approach
- potential impact on existing functionality
- alternative solutions considered

---

## Support and Communication

### Development Questions

- check existing documentation first
- search closed issues for similar problems
- provide context and specific examples when asking questions
- reference relevant code sections or error messages

### Code Review Feedback

- focus on code quality, maintainability, and standards
- provide constructive suggestions with examples
- acknowledge positive aspects of the contribution
- explain reasoning behind requested changes
