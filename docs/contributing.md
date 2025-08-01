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

## Related Documentation

- [Code Quality](./code-quality.md) - Quality standards and automated enforcement
- [Testing](./testing.md) - Testing requirements and framework guidelines
- [Scripts](./scripts.md) - Development commands and workflow automation
- [Stack](./stack.md) - Technology requirements and setup dependencies
- [Code Organization](./code-organization.md) - Project structure and naming conventions

---

## Overview

This document defines the development workflow specifications and standards for contributing to this project, ensuring consistent code quality, maintainable architecture, and effective collaboration across all team members.

#### Core Principles

- Automated quality assurance through pre-commit hooks
- [Conventional commit standards](https://www.conventionalcommits.org/) for clear project history
- Testing coverage with minimum 80% threshold
- TypeScript-first development with strict type checking

#### Quality Philosophy

All contributions undergo automated quality checks and peer review to maintain high standards while supporting developer productivity through established tooling and clear guidelines.

---

## Development Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/) via [nvm](https://github.com/nvm-sh/nvm) (version specified in .nvmrc)
- npm (included with Node.js)

### Initial Setup

```bash
# Install and activate Node.js version
nvm install
nvm use

# Install project dependencies
npm install

# Verify setup
npm run test
npm run lint
npm run tsc
```

---

## Development Workflow

### Branch Strategy

Follow [GitHub Flow](https://guides.github.com/introduction/flow/) pattern:

- `main` branch contains production-ready code
- Feature branches follow naming pattern: `feature/descriptive-name`
- Bug fix branches follow pattern: `fix/descriptive-name`
- Hotfix branches follow pattern: `hotfix/descriptive-name`

### Development Process

```bash
# Start development server with hot reload
npm run dev

# Run tests in watch mode during development
npm run test:watch

# Type checking during development
npm run tsc

# Format code automatically
npm run format:fix

# Lint and auto-fix issues
npm run lint:fix
```

---

## Code Quality Standards

### Automated Quality Checks

Pre-commit hooks automatically run:

- TypeScript compilation check
- Test execution with coverage thresholds
- Linting with automatic fixes where possible
- Code formatting with [Prettier](https://prettier.io/)

### Manual Quality Verification

```bash
# Run full test suite with coverage
npm run test:coverage

# Check code formatting
npm run format

# Lint check without fixes
npm run lint

# Bundle analysis for performance optimization
npm run analyze
```

---

## Pull Request Requirements

### Before Submitting

- Ensure all tests pass locally
- Verify TypeScript compilation succeeds
- Run linting and formatting tools
- Update documentation if necessary
- Include test coverage for new functionality

### Pull Request Format

- Descriptive title following conventional commit format
- Clear description of changes and motivation
- Reference related issues when applicable
- Include screenshots for UI changes

### Review Process

- Automated CI checks must pass
- At least one code review approval required
- Documentation updates reviewed for accuracy
- Performance impact assessed for significant changes

---

## Commit Standards

### Conventional Commits

Follow the [Conventional Commits specification](https://www.conventionalcommits.org/) for all commit messages:

```bash
# Feature additions
feat: add user authentication system

# Bug fixes
fix: resolve navigation menu overflow issue

# Documentation updates
docs: update api integration guidelines

# Code style changes
style: apply consistent formatting to components

# Refactoring without feature changes
refactor: simplify data fetching logic

# Test additions or modifications
test: add coverage for form validation

# Build process or dependency updates
chore: update dependencies to latest versions
```

### Commit Message Format

```
type(scope): description

Detailed explanation of changes when necessary

- Key changes or considerations
- Impact on existing functionality
- References to issues or documentation
```

For detailed guidance, see the [Conventional Commits documentation](https://www.conventionalcommits.org/en/v1.0.0/).

---

## Testing Guidelines

### Test File Organization

- Unit tests: `component.test.tsx`
- Hook tests: `hook-name.hook.test.ts`
- Integration tests: `feature-name.integration.test.ts`
- Test utilities: Shared testing setup and mocks

### Testing Standards

Following [Testing Library principles](https://testing-library.com/docs/guiding-principles):

- Maintain minimum 80% code coverage
- Test public APIs and user interactions
- Mock external dependencies appropriately
- Focus on behavior rather than implementation details

### Test Execution

```bash
# Run all tests
npm run test

# Watch mode for active development
npm run test:watch

# Coverage report generation
npm run test:coverage

# Interactive test UI
npm run test:ui
```

---

## Code Standards

### TypeScript Configuration

Following [TypeScript best practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html):

- Strict type checking enabled
- Explicit return types for public functions
- Proper interface definitions for data structures
- Effective use of generic types when appropriate

### Naming Conventions

- **Components**: PascalCase with descriptive names
- **Hooks**: camelCase starting with 'use'
- **Utilities**: camelCase with clear purpose indication
- **Constants**: UPPER_SNAKE_CASE for module-level constants

### Component Structure

```typescript
interface ComponentProps {
  // Prop definitions with proper types
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component implementation
  return <div>component content</div>
}

export default Component
```

---

## Documentation Standards

### Code Documentation

- [JSDoc comments](https://jsdoc.app/) for public functions and complex logic
- README files for major features or modules
- Inline comments for business logic explanations
- Type definitions serve as primary API documentation

### Documentation Updates

- Update relevant docs with feature changes
- Maintain accuracy of examples and code samples
- Review cross-references between documentation files
- Ensure consistency with established writing guidelines

---

## Issue Reporting

### Bug Reports

Include the following information following [bug report best practices](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines):

- Steps to reproduce the issue
- Expected versus actual behavior
- Environment details (browser, Node.js version, etc.)
- Relevant error messages or console output
- Screenshots or screen recordings when helpful

### Feature Requests

Provide context for new features:

- Use case description and user value
- Proposed implementation approach
- Potential impact on existing functionality
- Alternative solutions considered

---

## Support and Communication

### Development Questions

- Check existing documentation first
- Search closed issues for similar problems
- Provide context and specific examples when asking questions
- Reference relevant code sections or error messages

### Code Review Feedback

Following [code review best practices](https://google.github.io/eng-practices/review/):

- Focus on code quality, maintainability, and standards
- Provide constructive suggestions with examples
- Acknowledge positive aspects of the contribution
- Explain reasoning behind requested changes

---

## References

| Resource                                                                                                         | Description                                                                    |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Conventional Commits](https://www.conventionalcommits.org/)                                                     | Specification for adding human and machine-readable meaning to commit messages |
| [Node.js](https://nodejs.org/)                                                                                   | JavaScript runtime for development environment setup                           |
| [NVM](https://github.com/nvm-sh/nvm)                                                                             | Node Version Manager for handling multiple Node.js versions                    |
| [GitHub Flow](https://guides.github.com/introduction/flow/)                                                      | Lightweight, branch-based workflow for teams                                   |
| [Prettier](https://prettier.io/)                                                                                 | Code formatter for consistent code style                                       |
| [Testing Library](https://testing-library.com/docs/guiding-principles)                                           | Simple and complete testing utilities with focus on user interactions          |
| [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) | Official TypeScript guidelines for writing declaration files                   |
| [JSDoc](https://jsdoc.app/)                                                                                      | API documentation generator for JavaScript                                     |
| [Bug Report Guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines)              | Mozilla's guidelines for writing effective bug reports                         |
| [Code Review Best Practices](https://google.github.io/eng-practices/review/)                                     | Google's engineering practices for code reviews                                |
| [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)                                         | Guide to writing meaningful commit messages                                    |
| [Open Source Contributing](https://opensource.guide/how-to-contribute/)                                          | GitHub's guide to contributing to open source projects                         |
