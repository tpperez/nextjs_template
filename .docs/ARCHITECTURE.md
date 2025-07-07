# Architecture Guide

**Navigation:** [README](../README.md) | [Development Guide](DEVELOPMENT.md)

---

## Overview

This document outlines the architectural decisions, design patterns, and system organization that form the foundation of this Next.js template. The architecture prioritizes scalability, maintainability, and developer productivity through clear separation of concerns and established conventions.

**Live Implementation:** Pokemon Detail at `/pokemons/pikachu` demonstrates every architectural pattern described below.

---

## System Architecture

### Layered Architecture Model

The application follows a layered architecture pattern with clear separation of responsibilities:

**Architecture Flow:**

```
Routes (Server Components)
    ↓
Queries (Data Fetching)
    ↓
Views (Page Structure)
    ↓
Components (UI Elements)
    ↓
Services & Stores (Business Logic)
    ↓
Utils & Hooks (Shared Logic)
```

### Layer Responsibilities

**Routes Layer**

- server components handling routing and initial data fetching
- route-level error boundaries and loading states
- direct integration with Next.js App Router

**Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/page.tsx`

**Queries Layer**

- data fetching abstraction co-located with routes
- API error handling and response formatting
- cache configuration and revalidation strategies

**Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`

**Views Layer**

- complete page structures orchestrating multiple components
- business logic coordination and state management
- user interaction handling and data presentation

**Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

**Components Layer**

- reusable UI building blocks with focused responsibilities
- design system implementation and consistency
- accessibility and responsive design patterns

**Implementation Reference:** `app/components/ui/` and `app/views/pokemon-detail/components/`

**Services & Stores Layer**

- global business logic and API integrations
- application state management and persistence
- cross-cutting concerns like authentication and logging

**Implementation Reference:** `app/services/http/` and `app/stores/pokemon-history/`

**Utils & Hooks Layer**

- pure utility functions and data transformations
- reusable custom hooks and shared logic
- common patterns and helper functions

**Implementation Reference:** `app/utils/` and `app/hooks/`

---

## Data Fetching Architecture

### Universal Adapter Strategy

**Architectural Decision:** Unified HTTP adapters supporting both server-side and client-side usage patterns with flexible transport implementations.

**Server-Side Usage Pattern:**

**Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/page.tsx`

- demonstrates server component data fetching
- shows query function integration
- illustrates initial data passing to views

**Client-Side Usage Pattern:**

**Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

- demonstrates TanStack Query integration
- shows adapter usage within custom hooks
- illustrates cache configuration and error handling

**Adapter Benefits:**

- consistent API patterns across server and client contexts
- flexible transport layer (fetch, axios, graphql-request)
- unified error handling and response formatting
- seamless integration with caching strategies

### HTTP Client Implementation

**REST Adapter**

**Implementation Reference:** `app/services/http/rest-client.ts`

- fetch-based implementation with comprehensive error handling
- automatic request/response transformation
- configurable retry logic and timeout management
- type-safe response validation with error boundaries

**GraphQL Adapter**

**Implementation Reference:** `app/services/http/graphql-client.ts`

- graphql-request integration with cache coordination
- query optimization and request batching
- schema-based type generation and validation
- error handling with detailed GraphQL error formatting

**Implementation Example:** Pokemon Detail hybrid data strategy

**Reference:** `app/views/pokemon-detail/` module structure

- initial data via REST adapter for server-side rendering
- dynamic data via GraphQL adapter for client-side enhancement
- unified error handling across both transport mechanisms

---

## Component Architecture

### Component Hierarchy Strategy

**Global Components**

**UI Components Reference:** `app/components/ui/`

- design system building blocks (button, input, spinner)
- consistent styling and behavior patterns
- accessibility and responsive design implementation

**Structure Components Reference:** `app/components/structure/`

- application layout and navigation components
- shared structural patterns for consistent UX

**View Components**

**Implementation Reference:** `app/views/`

- complete page implementations with business logic
- component composition and orchestration
- route-specific functionality and data coordination

**Pokemon Detail Example:** `app/views/pokemon-detail/pokemon-detail.tsx`

- orchestrates multiple data sources (server + client)
- integrates state management for cross-session features
- composes sub-components for complex UI interactions

**View-Specific Components**

**Implementation Reference:** `app/views/[view]/components/`

- components used exclusively within specific views
- complex view-internal logic and interactions
- not intended for reuse outside the parent view

**Pokemon Moves Example:** `app/views/pokemon-detail/components/pokemon-moves/`

- GraphQL integration for dynamic moves data
- view-specific business logic and formatting
- isolated testing and development

### Module Co-location Strategy

**Decision Rationale:** Co-locate related functionality for development efficiency and maintainability.

**Implementation Pattern:** View modules contain hooks, types, components, tests

**Reference:** `app/views/pokemon-detail/` directory structure

- related functionality grouped in feature modules
- clear boundaries between global and module-specific code
- testing co-located with implementation for development efficiency

**Boundary Definition:**

- **global:** used across 3+ different modules or core infrastructure
- **module-specific:** used exclusively within single feature context
- **view-specific:** used only within individual view implementation

**Example Classification:**

- `components/ui/button.tsx` → global (used across multiple features)
- `views/pokemon-detail/pokemon-detail.hook.ts` → module-specific (only used in Pokemon Detail)
- `services/http/rest-client.ts` → global (used by multiple route queries)

---

## State Management Architecture

### Hybrid State Strategy

**Decision Rationale:** Different types of state require different management approaches for optimal performance and developer experience.

**Server State (TanStack Query)**

**Configuration Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

- API response caching and synchronization
- background refetching and optimistic updates
- error handling and retry mechanisms
- request deduplication and cache invalidation

**Client State (Zustand)**

**Implementation Reference:** `app/stores/pokemon-history/`

- user preferences and application settings
- form state and UI interactions
- cross-component communication
- persistence and hydration management

**Implementation Example:** Pokemon Detail state coordination

**Reference:** `app/views/pokemon-detail/` module integration

- server state via TanStack Query for Pokemon data
- client state via Zustand for viewing history
- seamless integration between both state types

### State Architecture Patterns

**Store Organization**

**Implementation Reference:** `app/stores/pokemon-history/`

- feature-based store segmentation
- clear interfaces and type definitions
- persistence strategies for cross-session data
- viewing history with local storage persistence
- type-safe state mutations and subscriptions
- integration with component lifecycle

**Hook Integration**

**Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

- custom hooks encapsulating state logic
- TanStack Query configuration and cache management
- error handling and loading state coordination
- GraphQL data fetching with intelligent caching
- error boundary integration and retry logic
- optimistic updates and cache invalidation

---

## Performance Architecture Implementation

### Multi-Layer Caching Strategy

**1. Next.js Cache (Server-Side)**

**Configuration Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`

- route-level ISR with configurable revalidation
- automatic static generation for popular pages
- edge caching integration for global performance
- ISR revalidation configuration at 3600 seconds
- error state handling with cache invalidation

**2. TanStack Query Cache (Client-Side)**

**Configuration Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

- smart invalidation and background refetching
- stale-while-revalidate patterns for optimal UX
- query deduplication and request batching
- cache configuration with staleTime and gcTime
- smart retry logic with exponential backoff

**3. Browser Cache (HTTP Headers)**

**Configuration Reference:** `app/services/http/` adapter implementations

- appropriate cache headers for static assets
- API response caching with ETags
- service worker integration preparation

### Code Splitting Strategy

**Route-Based Splitting**

**Reference:** Next.js App Router structure in `app/(routes)/`

- automatic code splitting via Next.js App Router
- lazy loading for non-critical routes
- optimized bundle sizes for faster initial loads

**Component-Based Splitting**

**Implementation Reference:** `app/views/pokemon-detail/components/` structure

- dynamic imports for heavy components
- conditional loading based on user interactions
- progressive enhancement patterns

**Pokemon Detail Example:** Progressive loading implementation

- initial page load with essential data
- progressive enhancement with additional features
- optimized bundle splitting for performance

---

## Security Architecture Implementation

### Type Safety Enforcement

**TypeScript Configuration Reference:** `tsconfig.json`

- strict mode enabled with explicit return types
- ESLint rules preventing `any` usage
- comprehensive type coverage across all layers

**Data Validation Patterns:**

**Implementation Reference:** `app/services/http/` error handling patterns

- runtime validation for external API responses
- component interface contracts for prop validation
- API response validation with error boundaries

**Data Sanitization Patterns:**

**Reference:** Route parameter handling in `app/(routes)/` structure

- input validation at component boundaries
- URL parameter sanitization in route handlers
- API response validation before state updates

**Security Boundaries:**

**Implementation Reference:** Query and component validation patterns

- server-side validation for all external inputs
- client-side validation for user experience
- type-safe data flow from API to component

### Environment Configuration Security

**Configuration Reference:** `.env.example` and service configurations

**Pattern Implementation:**

- startup validation for required configuration values
- development vs production environment separation
- error handling for missing or invalid configuration

**Environment Validation Reference:** Service configurations in `app/services/`

- API base URL validation and fallbacks
- feature flag configuration and defaults
- security token validation and rotation

---

## Testing Architecture Implementation

### Testing Strategy by Layer

**Component Testing Reference:** `app/views/pokemon-detail/pokemon-detail.test.tsx`

- component behavior and interaction testing with realistic scenarios
- mock integration for external dependencies (stores, services)
- accessibility and user experience validation
- error state handling and edge case coverage

**Hook Testing Reference:** `app/views/pokemon-detail/pokemon-detail.hook.test.ts`

- custom hook behavior and state management testing
- TanStack Query integration testing with mock responses
- error handling and loading state verification
- cache behavior and invalidation testing

**Integration Testing Reference:** Route-level testing patterns

- end-to-end user workflows with realistic data
- API integration testing with mock services
- performance testing and optimization validation
- cross-browser compatibility and responsive design

### Coverage and Quality Standards

**Coverage Requirements Reference:** `vitest.config.ts` configuration

- 80% minimum coverage threshold across all modules
- critical path coverage at 95% or higher
- edge case and error handling comprehensive coverage

**Quality Metrics Reference:** `eslint.config.mjs` and `tsconfig.json`

- TypeScript strict mode compliance
- ESLint rule enforcement and custom patterns
- accessibility standards validation (WCAG 2.1)
- performance budget adherence and monitoring

---

## Scalability Considerations

### Horizontal Scaling Patterns

**Microservice Integration:** Adapter pattern enables distributed architecture

**Reference:** `app/services/http/` adapter abstractions

- service layer abstraction supports multiple backend services
- consistent error handling across distributed systems
- cache coordination between services preventing cross-contamination

**Service Integration:** HTTP adapters enable distributed data fetching

**Implementation Reference:** Adapter usage across route queries and hooks

- consistent API patterns across different services
- error handling and retry logic abstraction
- cache coordination for distributed systems

**State Isolation:** Feature-based stores prevent cross-contamination

**Reference:** `app/stores/` modular organization

- clear boundaries between different application domains
- minimal dependencies between feature modules
- consistent patterns for state synchronization

### Evolution Pathways

**Real-time Integration:** WebSocket adapter addition capability

**Foundation Reference:** `app/services/http/` extensible architecture

- service layer abstraction supports additional protocols
- state management patterns enable real-time data flows
- component patterns support live data updates

**PWA Enhancement:** Service worker integration preparation

**Reference:** Caching strategies in adapter implementations

- cache strategies support offline-first patterns
- state persistence enables offline data access
- component patterns support progressive loading

**Monitoring Integration:** Performance tracking and error reporting hooks

**Reference:** Error handling patterns across service and component layers

- service layer provides integration points for monitoring
- component patterns support performance measurement
- error boundaries enable comprehensive error tracking

**Implementation Foundation:** Current architecture supports all evolution pathways through:

**Reference:** Template structure and established patterns

- established adapter patterns for new protocols
- modular organization for independent feature evolution
- consistent testing patterns for reliable scaling

---

## Next Steps

**Practical Implementation:** See [Development Guide](DEVELOPMENT.md) for complete Pokemon Detail walkthrough and daily development patterns.

**Live Examples:** Explore `/pokemons/pikachu` for working demonstration of all architectural patterns described above.

**Implementation Guidance:** Use Pokemon Detail implementation (`app/views/pokemon-detail/`) as reference for implementing new features following established architectural patterns.
