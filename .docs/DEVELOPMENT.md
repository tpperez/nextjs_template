# Development Guide

**Navigation:** [README](../README.md) | [Architecture Guide](ARCHITECTURE.md)

---

## Overview

Daily development patterns, coding conventions, and implementation guidelines for contributors working on the codebase. This guide provides practical implementation guidance using Pokemon Detail as a complete working example.

**Live Reference:** `/pokemons/pikachu` demonstrates all patterns described below.

---

## Code Organization

### Project Directory Structure

**Complete Application Structure Reference:** `app/` directory

**Route Organization:**

- `(routes)/` - next.js app router structure
- `(auth)/` - authentication-protected routes
- `(public)/` - publicly accessible routes
- `(examples)/` - demonstration features
- `api/` - api route handlers

**Component Organization:**

- `components/` - global reusable components
- `structure/` - layout and navigation components
- `ui/` - design system components (no suffix)

**Business Logic Organization:**

- `constants/` - global application constants (no suffix)
- `hooks/` - global custom react hooks (no suffix)
- `services/` - global business services (no suffix)
- `http/` - http client adapters
- `stores/` - global state management (zustand)
- `styles/` - global stylesheets and themes
- `typings/` - global typescript definitions
- `utils/` - global utility functions (no suffix)
- `views/` - page orchestrators and business logic

**Feature Module Structure Reference:** `app/views/pokemon-detail/`

complete feature implementation with co-located:

- main view component
- view-specific hooks for data logic
- view-specific type definitions
- view-specific constants
- view-specific utilities
- component tests
- sub-components directory

### Directory Naming Conventions

**Global Directories:** lowercase with descriptive names (no suffix required)

**Reference Examples:**

- `components/` - globally reusable UI components
- `services/` - business logic and external integrations
- `utils/` - pure utility functions and helpers
- `hooks/` - custom react hooks for shared logic
- `constants/` - application-wide constant values

**Feature Directories:** kebab-case with descriptive feature names

**Reference Examples:**

- `pokemon-detail/` - complete feature implementation
- `user-profile/` - user management feature
- `product-catalog/` - product listing and search

**File Naming:** kebab-case with descriptive type suffixes

**Reference Examples:**

- `component-name.tsx` - react component implementation
- `feature-name.hook.ts` - custom hook for feature logic
- `service-name.types.ts` - typescript type definitions
- `utility-name.test.ts` - test files for specific modules

---

## Implementation Patterns

### Feature Development Workflow

**Step 1: Route Setup**

**Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/page.tsx`

demonstrates:

- server component implementation for routing
- query function integration
- initial data fetching
- error handling patterns
- data passing to view layer

**Step 2: Query Implementation**

**Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`

demonstrates:

- server-side data fetching co-located with route
- REST adapter usage with error handling
- next.js ISR configuration
- type-safe response handling

**Step 3: View Component**

**Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

demonstrates:

- main view component orchestrating the feature
- client directive usage for interactive components
- custom hook integration
- state management coordination
- component composition patterns

**Step 4: Custom Hook Integration**

**Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

demonstrates:

- client-side data management with TanStack Query
- GraphQL adapter integration
- cache configuration strategies
- error handling and loading states
- optimistic updates patterns

### Testing Implementation Patterns

**Component Testing Strategy:**

**Reference:** `app/views/pokemon-detail/pokemon-detail.test.tsx`

demonstrates:

- component rendering and interaction testing
- mock integration for external dependencies
- accessibility validation approaches
- error state and edge case coverage
- realistic data mocking patterns

**Hook Testing Strategy:**

**Reference:** `app/views/pokemon-detail/pokemon-detail.hook.test.ts`

demonstrates:

- custom hook behavior testing with renderHook
- TanStack Query integration testing
- cache behavior verification
- error handling and loading state testing
- mock provider setup patterns

---

## Module Organization Patterns

### View Module Structure

**Reference Implementation:** `app/views/pokemon-detail/`

**Module Contents:**

- main view component (`pokemon-detail.tsx`)
- custom hooks (`pokemon-detail.hook.ts`)
- type definitions (`pokemon-detail.types.ts`)
- constants (`pokemon-detail.const.ts`)
- utilities (`pokemon-detail.util.ts`)
- component tests (`pokemon-detail.test.tsx`)
- sub-components directory (`components/`)
- public exports (`index.ts`)

**Sub-Component Module Structure:**

**Reference:** `app/views/pokemon-detail/components/pokemon-moves/`

demonstrates:

- sub-component implementation
- sub-component specific hooks
- sub-component tests
- isolated module exports

### Store Module Structure

**Reference Implementation:** `app/stores/pokemon-history/`

demonstrates:

- zustand store implementation
- store interface definitions
- store configuration constants
- store behavior testing
- store module public exports

### Route Module Structure

**Reference Implementation:** `app/(routes)/(public)/(examples)/pokemons/[name]/`

demonstrates:

- next.js route component
- optional loading UI
- optional error boundary
- server-side data fetching queries
- query-specific type definitions

### File Relationship Patterns

**Data Flow Relationships Reference:** Pokemon Detail implementation flow

**Route to View Integration:**

- route component imports query functions
- calls data fetching functions
- passes initial data to view components

**View Component Integration:**

- imports custom hooks and type definitions
- uses client-side data enhancement
- imports global stores
- renders sub-components

**Custom Hook Integration:**

- imports HTTP service adapters
- uses TanStack Query for client-side fetching
- returns formatted data for component consumption

**Store Integration:**

- imports from global stores directory
- provides cross-component state sharing
- handles data persistence patterns

---

## Code Quality Standards

### TypeScript Configuration

**Reference:** `tsconfig.json` configuration

enforces:

- strict mode with explicit return types
- no unchecked indexed access
- no implicit returns
- no fallthrough cases in switch statements

**Type Definition Patterns Reference:** Pokemon Detail type implementations

demonstrates:

- explicit return types for all functions
- interface definitions for component props
- union types for controlled state values
- proper generic usage patterns

### ESLint Configuration

**Reference:** `eslint.config.mjs`

enforces:

- no explicit any types
- explicit function return types
- organized import statements
- consistent naming conventions

**Code Organization Rules:**

- import statements organized by source (external, internal, relative)
- consistent naming conventions across all modules
- explicit return types for enhanced type safety
- no any types allowed in production code

---

## Development Workflow

### Local Development Setup

**Environment Preparation Reference:** Package configuration

**Setup Commands:**

- node version management via `.nvmrc`
- dependency installation via `package.json`
- development server startup
- testing suite execution
- type checking validation

**Development Commands Reference:** `package.json` scripts

includes:

- development with hot reload
- production build testing
- comprehensive testing options
- code quality checks
- bundle analysis tools

### Feature Development Process

**Branch Creation Reference:** Development guidelines

follows naming convention:

- feature branch patterns
- fix branch patterns
- refactor branch patterns

**Development Cycle:**

1. **implementation:** follow established patterns from Pokemon Detail reference
2. **testing:** write comprehensive tests for all new functionality
3. **validation:** ensure TypeScript compilation and ESLint compliance
4. **documentation:** update relevant documentation for new patterns
5. **review:** submit PR with detailed description and testing instructions

**Commit Message Standards Reference:** Commitizen configuration

demonstrates:

- conventional commit format usage
- automated commit message generation
- standardized change categorization

---

## Example Walkthrough: Pokemon Detail Implementation

### Complete Feature Demonstration

**Live Example:** `/pokemons/pikachu`
**Implementation Path:** Server-side data → Client-side enhancement → State management → Testing

This walkthrough demonstrates every architectural pattern in the codebase through a working implementation.

### Server-Side Data Layer

**Route Structure Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/`

**Query Implementation Reference:** `queries/get-pokemon-detail.query.ts`

- REST adapter usage with Next.js caching configuration
- error handling with result wrapper pattern
- type-safe response transformation

**Route Component Reference:** `page.tsx`

- server component data fetching integration
- error boundary and not-found handling
- data passing to view layer

**Key Pattern:** Server-first approach for SEO and performance optimization.

### Client-Side Enhancement Layer

**View Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

- server data consumption through props
- client-side data enhancement integration
- state management coordination
- component composition orchestration

**Custom Hook Reference:** `pokemon-detail.hook.ts`

- TanStack Query configuration for dynamic data
- GraphQL adapter usage for moves data
- cache management with stale-while-revalidate
- error handling and loading states

**Key Pattern:** Progressive enhancement without blocking initial render.

### State Management Layer

**Store Implementation Reference:** `app/stores/pokemon-history/`

- zustand store with persistence
- viewing history tracking
- cross-session data management
- type-safe state mutations

**Integration Pattern:** Store usage in view components

- state subscription patterns
- action dispatch handling
- persistence coordination

**Key Pattern:** Client state for user preferences, server state for API data.

### Component Architecture Layer

**Sub-Component Reference:** `app/views/pokemon-detail/components/pokemon-moves/`

- view-specific component implementation
- GraphQL data integration
- isolated testing approach

**Form Component Reference:** `app/views/pokemons/components/pokemon-search/`

- React Hook Form integration
- validation patterns
- submission handling

**Key Pattern:** Component hierarchy with clear responsibilities.

### Testing Implementation Strategy

**Component Testing Reference:** `pokemon-detail.test.tsx`

demonstrates:

- mock external dependencies (stores, hooks, services)
- test component rendering and user interactions
- verify accessibility attributes and behavior
- test error states and edge cases

**Key Testing Patterns:**

- vi.mock() for store and hook dependencies
- screen.getByRole() for accessibility testing
- render() with custom test utilities
- mock data with realistic structure

### Form Testing Patterns

**Reference Implementation:** `pokemon-search.test.tsx`

demonstrates:

- form submission and validation testing
- mock TanStack Query integration
- loading states and user interactions
- form reset and error handling

**Test Coverage Areas:**

- form input validation and user interactions
- loading state management during form submission
- clear functionality and form reset behavior
- integration with search functionality and query triggers

### Hook Testing Patterns

**Reference Implementation:** `pokemon-detail.hook.test.ts`

demonstrates:

- renderHook with TanStack Query wrapper
- mock GraphQL responses
- cache behavior testing
- error handling verification

**Testing Approach:**

- test custom hook behavior and state management
- verify TanStack Query integration with mock responses
- test error handling and loading state verification
- validate cache behavior and invalidation patterns

---

## Performance Optimization

### Bundle Optimization Strategies

**Code Splitting Implementation Reference:** Dynamic import patterns in components

demonstrates:

- dynamic imports for heavy components
- conditional loading based on user interaction
- suspense boundary usage
- loading state management

**Image Optimization Reference:** Next.js Image component usage

demonstrates:

- image component with optimization
- priority and placeholder configuration
- responsive image handling
- performance optimization patterns

### Caching Strategy Implementation

**Multi-Layer Cache Configuration:**

**Server-Side Reference:** Query implementations with ISR

- appropriate revalidation timing
- cache invalidation tags
- error state caching strategies

**Client-Side Reference:** TanStack Query configurations

- stale time and garbage collection
- retry logic with exponential backoff
- cache invalidation patterns

---

## Debugging and Troubleshooting

### Development Tools Integration

**React Developer Tools Usage:**

- component state inspection and modification
- prop drilling analysis and optimization
- render cycle debugging and performance profiling

**Network Debugging Reference:** HTTP client configurations

- debug mode configuration
- request and response logging
- error state debugging

**State Debugging Reference:** Zustand devtools integration

- store state inspection
- action tracking
- persistence debugging

### Common Issues and Solutions

**Build Issues:**

- TypeScript errors: ensure all types are properly defined and imported
- import path errors: verify relative paths and module resolution
- missing dependencies: check package.json for all required packages

**Runtime Issues:**

- hydration mismatches: ensure server and client render identical markup
- state synchronization: verify TanStack Query and Zustand integration
- API request failures: implement proper error boundaries and retry logic

**Performance Issues:**

- bundle size optimization: analyze with bundle analyzer
- render optimization: use React DevTools Profiler
- cache efficiency: monitor TanStack Query cache behavior

---

## Best Practices Summary

### Component Development

- **single responsibility:** each component should have one clear purpose
- **composition over inheritance:** combine simple components for complex behavior
- **prop interface clarity:** explicit and well-documented component interfaces
- **accessibility first:** semantic HTML and ARIA attributes by default

### State Management

- **appropriate tool selection:** server state via TanStack Query, client state via Zustand
- **minimal state scope:** keep state as local as possible to the components that need it
- **predictable mutations:** clear patterns for state updates and side effects
- **testing coverage:** comprehensive testing for all state management logic

### Performance Considerations

- **lazy loading implementation:** dynamic imports for non-critical components
- **cache strategy coordination:** multi-layer caching with appropriate invalidation
- **bundle optimization:** code splitting and tree shaking for optimal bundle sizes
- **monitoring integration:** performance tracking and error reporting

---

## Next Steps

**Feature Implementation:** Use Pokemon Detail patterns (`app/views/pokemon-detail/`) as reference for implementing new features.

**Architecture Understanding:** Review [Architecture Guide](ARCHITECTURE.md) for comprehensive system design patterns.

**Live Examples:** Explore `/pokemons/pikachu` for hands-on demonstration of all development patterns described above.
