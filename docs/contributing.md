# Contributing Guidelines

Development workflow specifications and standards for contributing to this project.

## development environment setup

### prerequisites

- node.js via nvm (version specified in .nvmrc)
- npm (included with node.js)

### initial setup

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

## development workflow

### branch strategy

- main branch contains production-ready code
- feature branches follow naming pattern: feature/descriptive-name
- bug fix branches follow pattern: fix/descriptive-name
- hotfix branches follow pattern: hotfix/descriptive-name

### development process

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

## code quality standards

### automated quality checks

pre-commit hooks automatically run:

- typescript compilation check
- test execution
- linting with automatic fixes
- code formatting with prettier

### manual quality verification

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

## pull request requirements

### before submitting

- ensure all tests pass locally
- verify typescript compilation succeeds
- run linting and formatting tools
- update documentation if necessary
- include test coverage for new functionality

### pull request format

- descriptive title following conventional commit format
- clear description of changes and motivation
- reference related issues when applicable
- include screenshots for ui changes

### review process

- automated ci checks must pass
- at least one code review approval required
- documentation updates reviewed for accuracy
- performance impact assessed for significant changes

## commit standards

### conventional commits

follow conventional commit specification for all commit messages:

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

### commit message format

```
type(scope): description

detailed explanation of changes when necessary

- key changes or considerations
- impact on existing functionality
- references to issues or documentation
```

## testing guidelines

### test file organization

- unit tests: component.test.tsx
- hook tests: hook-name.hook.test.ts
- integration tests: feature-name.integration.test.ts
- test utilities: shared testing setup and mocks

### testing standards

- maintain minimum 80% code coverage
- test public apis and user interactions
- mock external dependencies appropriately
- follow testing library best practices

### test execution

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

## code standards

### typescript configuration

- strict type checking enabled
- explicit return types for public functions
- proper interface definitions for data structures
- effective use of generic types when appropriate

### naming conventions

reference naming-conventions.md for detailed standards:

- components: PascalCase with descriptive names
- hooks: camelCase starting with 'use'
- utilities: camelCase with clear purpose indication
- constants: UPPER_SNAKE_CASE for module-level constants

### component structure

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

## documentation standards

### code documentation

- jsDoc comments for public functions and complex logic
- readme files for major features or modules
- inline comments for business logic explanations
- type definitions serve as primary api documentation

### documentation updates

- update relevant docs with feature changes
- maintain accuracy of examples and code samples
- review cross-references between documentation files
- ensure consistency with established writing guidelines

## issue reporting

### bug reports

include the following information:

- steps to reproduce the issue
- expected versus actual behavior
- environment details (browser, node version, etc.)
- relevant error messages or console output
- screenshots or screen recordings when helpful

### feature requests

provide context for new features:

- use case description and user value
- proposed implementation approach
- potential impact on existing functionality
- alternative solutions considered

## support and communication

### development questions

- check existing documentation first
- search closed issues for similar problems
- provide context and specific examples when asking questions
- reference relevant code sections or error messages

### code review feedback

- focus on code quality, maintainability, and standards
- provide constructive suggestions with examples
- acknowledge positive aspects of the contribution
- explain reasoning behind requested changes
