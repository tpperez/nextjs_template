# Development Tools

Development environment configuration and toolchain specifications.

## node.js environment

### version management

node version manager (nvm) handles node.js version consistency:

```bash
# .nvmrc file specifies exact node version
# install specified version
nvm install

# activate project node version
nvm use

# verify active version
node --version
```

### package management

npm serves as the primary package manager with lock file for dependency consistency:

```bash
# install all dependencies
npm install

# install specific package
npm install package-name

# install development dependency
npm install --save-dev package-name

# verify dependency tree integrity
npm audit
```

## development server

### next.js development

development server with turbopack for enhanced performance:

```bash
# start development server
npm run dev

# server configuration
# - hot module replacement enabled
# - fast refresh for react components
# - automatic typescript compilation
# - tailwind css processing
# - port: 3000 (configurable)
```

### build process

production build configuration with optimization:

```bash
# create production build
npm run build

# analyze bundle size and dependencies
npm run analyze

# start production server
npm run start
```

## code quality toolchain

### typescript compiler

typescript configuration optimized for next.js and strict type checking:

```bash
# type check without compilation
npm run tsc

# configuration highlights
# - strict mode enabled
# - modern target (es2022)
# - next.js optimizations
# - path mapping for clean imports
```

typescript configuration file (tsconfig.json) includes:

- strict type checking rules
- path mapping for @ imports to app directory
- jsx configuration for react 19
- module resolution optimized for next.js

### eslint configuration

comprehensive linting with next.js, typescript, and accessibility rules:

```bash
# run linting
npm run lint

# automatic fixing where possible
npm run lint:fix

# eslint configuration includes
# - next.js recommended rules
# - typescript integration
# - react hooks validation
# - jsx accessibility (jsx-a11y)
# - import sorting and organization
# - prefer arrow functions
# - prettier integration
```

eslint extends multiple configurations:

- next/core-web-vitals for performance best practices
- @typescript-eslint for type-aware linting
- prettier for code formatting consistency
- jsx-a11y for accessibility standards

### prettier formatting

consistent code formatting across the codebase:

```bash
# format all files
npm run format:fix

# check formatting without changes
npm run format

# prettier configuration
# - tailwind css class sorting
# - 2-space indentation
# - single quotes for strings
# - trailing commas for cleaner diffs
```

prettier integrates with:

- tailwind css plugin for class organization
- eslint for conflict resolution
- ide extensions for real-time formatting

## testing framework

### vitest configuration

modern testing framework with typescript and jsdom support:

```bash
# run all tests
npm run test

# watch mode for active development
npm run test:watch

# coverage report
npm run test:coverage

# interactive ui for test management
npm run test:ui
```

testing setup includes:

- vitest as test runner for performance
- jsdom for browser environment simulation
- @testing-library/react for component testing
- @testing-library/jest-dom for extended matchers
- coverage reporting with v8 provider

### test execution environment

test configuration provides:

- typescript support without compilation step
- react testing utilities pre-configured
- jsdom environment for dom manipulation
- coverage collection from src directories
- automatic test discovery for .test and .spec files

## git integration

### husky pre-commit hooks

automated quality checks before commits:

```bash
# hooks automatically run
# - typescript compilation check
# - test execution
# - lint-staged processing

# manual hook execution
npm run prepare
```

pre-commit workflow:

1. typescript compilation verification
2. affected test execution
3. linting and formatting of staged files

### lint-staged configuration

processes only staged files for efficiency:

```javascript
// .lintstagedrc.mjs configuration
// - prettier formatting for staged javascript/typescript files
// - eslint fixing for staged files
// - relative path processing for cross-platform compatibility
```

### commitlint integration

conventional commit message enforcement:

```bash
# commit message validation
# automatically runs on git commit

# supported commit types
# feat: new features
# fix: bug repairs
# docs: documentation changes
# style: formatting modifications
# refactor: code restructuring
# test: test additions or changes
# chore: maintenance tasks
```

## ide configuration recommendations

### visual studio code

recommended extensions for optimal development experience:

- typescript and javascript language features
- eslint integration for real-time linting
- prettier code formatting
- tailwind css intellisense
- next.js code snippets
- react code snippets
- git integration enhancements

workspace settings suggestions:

- format on save enabled
- eslint auto-fix on save
- typescript errors in problems panel
- tailwind css class completion

### other ide support

project configuration supports:

- webstorm/intellij with typescript and react plugins
- neovim with typescript lsp and tree-sitter
- emacs with typescript-mode and web-mode
- any editor supporting typescript language server

## bundle analysis

### webpack bundle analyzer

performance optimization through bundle inspection:

```bash
# generate bundle analysis report
npm run analyze

# analysis includes
# - bundle size visualization
# - dependency tree mapping
# - chunk size distribution
# - potential optimization opportunities
```

bundle analyzer integration:

- @next/bundle-analyzer for next.js optimization
- client and server bundle analysis
- interactive treemap visualization
- size comparison across builds

## environment variables

### development configuration

environment variable management for different contexts:

```bash
# development environment (.env.local)
# - api endpoints
# - feature flags
# - debug configurations
# - third-party service keys (development only)

# production environment
# - production api urls
# - analytics configurations
# - performance monitoring keys
```

environment file hierarchy:

- .env for default values
- .env.local for local overrides (gitignored)
- .env.production for production-specific values
- next.js automatically loads appropriate files

## performance monitoring

### build performance

tracking build metrics and optimization:

- typescript compilation time
- next.js build duration
- bundle size tracking
- test execution performance

development metrics include:

- hot module replacement speed
- fast refresh activation time
- development server startup duration
- test suite execution time

### runtime performance

monitoring application performance in development:

- react strict mode warnings
- next.js performance hints
- lighthouse integration recommendations
- core web vitals tracking preparation
