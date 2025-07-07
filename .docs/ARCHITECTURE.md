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

- Server Components handling routing and initial data fetching
- Route-level error boundaries and loading states
- Direct integration with Next.js App Router

**Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/page.tsx`

**Queries Layer**

- Data fetching abstraction co-located with routes
- API error handling and response formatting
- Cache configuration and revalidation strategies

**Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`

**Views Layer**

- Complete page structures orchestrating multiple components
- Business logic coordination and state management
- User interaction handling and data presentation

**Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

**Components Layer**

- Reusable UI building blocks with focused responsibilities
- Design system implementation and consistency
- Accessibility and responsive design patterns

**Implementation Reference:** `app/components/ui/` and `app/views/pokemon-detail/components/`

**Services & Stores Layer**

- Global business logic and API integrations
- Application state management and persistence
- Cross-cutting concerns like authentication and logging

**Implementation Reference:** `app/services/http/` and `app/stores/pokemon-history/`

**Utils & Hooks Layer**

- Pure utility functions and data transformations
- Reusable custom hooks and shared logic
- Common patterns and helper functions

**Implementation Reference:** `app/utils/` and `app/hooks/`

---

## Data Fetching Architecture

### Universal Adapter Strategy

**Architectural Decision:** Unified HTTP adapters supporting both server-side and client-side usage patterns with flexible transport implementations.

**REST Adapter Implementations:** `app/services/http/rest/adapters/`

- **FetchRestAdapter** (default) - Using fetch API
- **AxiosRestAdapter** (alternative) - Using axios library
- Universal compatibility across server and client contexts

**GraphQL Adapter Implementations:** `app/services/http/graphql/adapters/`

- **FetchGraphQLAdapter** (default) - Using fetch API
- **GraphQLRequestAdapter** (alternative) - Using graphql-request library
- Universal compatibility across server and client contexts

**Current Configuration:** `app/services/http/core/core.ts`

- default rest adapter: FetchRestAdapter (fetch api)
- default graphql adapter: FetchGraphQLAdapter (fetch api)
- easy switching via HTTP_ADAPTER_CONFIG factory functions

**Adapter Flexibility:** Both adapters are environment-agnostic and can be used:

- **Server-side:** Route queries, API handlers, middleware
- **Client-side:** Within TanStack Query hooks, user interactions, real-time updates

**Live Demonstration:** Pokemon Detail showcases adapter versatility using REST server-side and GraphQL client-side.

### Server-Side Data Pattern

**Strategy:** Prioritize server-side rendering for initial page loads using appropriate adapters.

**Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`

**Pattern Demonstration:**

- Route query functions for server-side data fetching
- REST adapter usage with Next.js caching integration (Pokemon Detail example)
- Error handling with result wrapper pattern
- Type-safe response transformation

**Benefits:**

- Optimal SEO with crawlable content
- Faster initial page loads and better Core Web Vitals
- Reduced client-side complexity for critical rendering path
- Better performance on slower devices and networks

**Adapter Choice:** REST adapter chosen for Pokemon Detail initial data, but GraphQL adapter equally viable for server-side usage.

**Cache Strategy:**

- ISR revalidation: 3600 seconds for Pokemon data
- Automatic cache invalidation on errors
- Edge caching optimization for static content

### Client-Side Enhancement Pattern

**Strategy:** TanStack Query as cache management layer with HTTP adapters as transport executors.

**Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

**Client-Side Architecture:**

- **TanStack Query Hook:** Cache management, loading states, error handling
- **queryFn Execution:** HTTP adapter performs actual request
- **Layer Separation:** Cache logic independent of transport implementation

**Pattern Demonstration:**

- TanStack Query configuration for cache and state management
- HTTP adapters (REST/GraphQL) execute within `queryFn`
- Cache management with stale-while-revalidate strategies
- Loading, error, and success state coordination

**Benefits:**

- **TanStack Query Layer:** Cache invalidation, background updates, loading states, query deduplication
- **HTTP Adapter Layer:** Request execution, response transformation, transport-specific error handling
- **Separation of Concerns:** Cache logic independent of transport implementation
- **Adapter Flexibility:** Easy switching between fetch/axios/graphql-request without affecting cache layer

**Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`

- usePokemonSpecies: REST adapter within TanStack Query
- usePokemonMovesGraphQL: GraphQL adapter within TanStack Query
- Both demonstrate proper TanStack Query + adapter integration patterns

**Adapter Choice:** GraphQL adapter chosen for Pokemon moves data, but REST adapter equally viable for client-side dynamic updates based on data requirements, not environment constraints.

**Configuration Pattern:**

- 5-minute stale time for interactive data
- Smart retry logic with exponential backoff
- Error boundary integration for graceful failures

### HTTP Service Integration

**REST Adapter Implementations:** `app/services/http/rest/adapters/`

- **FetchRestAdapter** (default) - Native fetch API with Next.js integration
- **AxiosRestAdapter** (alternative) - Axios library with interceptors and advanced features
- Universal implementation working in server and client contexts
- Type-safe configuration with environment validation

**GraphQL Adapter Implementations:** `app/services/http/graphql/adapters/`

- **FetchGraphQLAdapter** (default) - Native fetch API for GraphQL queries
- **GraphQLRequestAdapter** (alternative) - graphql-request library with specialized features
- Universal implementation supporting both environments
- Request deduplication and query optimization

**Client-Side Integration Pattern:**

- **Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`
- TanStack Query wraps HTTP adapters for cache management
- Adapters execute within queryFn functions
- Cache configuration and state management handled by TanStack Query

**Server-Side Integration Pattern:**

- **Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`
- Direct adapter usage for route queries
- Next.js ISR integration with revalidate configuration
- Error handling with result wrapper pattern

**Usage Patterns Reference:** Pokemon Detail demonstrates flexible adapter usage:

- **Server-side:** REST adapter for initial Pokemon data (could use GraphQL)
- **Client-side:** GraphQL adapter for dynamic moves data within TanStack Query (could use REST)
- **Flexibility:** Both adapters work in both environments based on data requirements

**Adapter Selection Criteria:**

- **REST:** Simple CRUD operations, excellent caching, familiar patterns
- **GraphQL:** Complex queries, field selection, real-time subscriptions
- **Environment:** Both adapters work universally (server + client)
- **Client-Side:** Always wrapped by TanStack Query for cache management

---

## State Management Architecture

### Zustand Store Implementation Strategy

**Architectural Decision:** Feature-based stores with selective persistence for cross-session state management.

**Store Implementation Reference:** `app/stores/pokemon-history/pokemon-history.ts`

- Zustand store with persistence middleware
- Type-safe actions and state mutations
- Automatic size management and pruning

**Integration Pattern Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

- Component integration via custom hooks
- Side effect management with useEffect
- State updates triggered by navigation events

### Store Design Patterns

**Persistence Strategy:**

- Selective serialization via partialize configuration
- Storage key namespacing for multi-store applications
- Cross-session state recovery with validation

**Type Safety Implementation:**

- Interface-driven store definitions (`pokemon-history.type.ts`)
- Inferred types for actions and selectors
- Type-safe persistence configuration

**Testing Strategy Reference:** `app/stores/pokemon-history/pokemon-history.test.ts`

- Store behavior testing with renderHook
- State mutation verification across multiple scenarios
- Persistence middleware testing with mock storage

### State Management Patterns

**Feature-Based Stores:**

- Each major feature has dedicated store when needed
- Clear boundaries between different state domains
- Minimal cross-store dependencies

**Store Module Structure:**

```bash
stores/pokemon-history/
├── pokemon-history.ts              # Store implementation
├── pokemon-history.type.ts         # TypeScript interfaces
├── pokemon-history.const.ts        # Configuration constants
├── pokemon-history.test.ts         # Comprehensive testing
└── index.ts                        # Public exports
```

**Integration Guidelines:**

- Use stores for cross-component state that needs persistence
- Prefer React state for component-local interactions
- Implement stores when state outlives component lifecycle

---

## Component Architecture Implementation

### Layered Component Organization

**UI Components** (`app/components/ui/`)

- Basic, reusable interface elements
- Design system implementation with consistent patterns
- No business logic or external dependencies
- High reusability across different contexts

**Structure Components** (`app/components/structure/`)

- Layout and navigation components
- Application shell and wrapper components
- Shared structural patterns for consistent UX

**View Components** (`app/views/`)

- Complete page implementations with business logic
- Component composition and orchestration
- Route-specific functionality and data coordination

**Implementation Example:** `app/views/pokemon-detail/pokemon-detail.tsx`

- Orchestrates multiple data sources (server + client)
- Integrates state management for cross-session features
- Composes sub-components for complex UI interactions

**View-Specific Components** (`app/views/[view]/components/`)

- Components used exclusively within specific views
- Complex view-internal logic and interactions
- Not intended for reuse outside the parent view

**Implementation Example:** `app/views/pokemon-detail/components/pokemon-moves/`

- GraphQL integration for dynamic moves data
- View-specific business logic and formatting
- Isolated testing and development

### Module Co-location Strategy

**Decision Rationale:** Co-locate related functionality for development efficiency and maintainability.

**Implementation Pattern:** View modules contain hooks, types, components, tests

- Related functionality grouped in feature modules
- Clear boundaries between global and module-specific code
- Testing co-located with implementation for development efficiency

**Boundary Definition:**

- **Global:** Used across 3+ different modules or core infrastructure
- **Module-Specific:** Used exclusively within single feature context
- **View-Specific:** Used only within individual view implementation

**Example Classification:**

- `components/ui/button.tsx` → Global (used across multiple features)
- `views/pokemon-detail/pokemon-detail.hook.ts` → Module-specific (only used in Pokemon Detail)
- `services/http/rest-client.ts` → Global (used by multiple route queries)

---

## Performance Architecture Implementation

### Multi-Layer Caching Strategy

**1. Next.js Cache (Server-Side)**

- Route-level ISR with configurable revalidation
- Automatic static generation for popular pages
- Edge caching integration for global performance

**Configuration Example:** Pokemon Detail query with 1-hour revalidation

- **Implementation Reference:** `app/(routes)/(public)/(examples)/pokemons/[name]/queries/get-pokemon-detail.query.ts`
- ISR revalidation configuration at 3600 seconds
- Error state handling with cache invalidation

**2. TanStack Query Cache (Client-Side)**

- Smart invalidation and background refetching
- Stale-while-revalidate patterns for optimal UX
- Query deduplication and request batching

**Configuration Example:** Pokemon moves with 5-minute stale time

- **Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`
- Cache configuration with staleTime and gcTime
- Smart retry logic with exponential backoff

**3. Store Persistence (Cross-Session)**

- Selective state serialization for important data
- Cross-session state recovery with validation
- Storage optimization and cleanup strategies

**Configuration Example:** Pokemon history with size management

- **Implementation Reference:** `app/stores/pokemon-history/pokemon-history.ts`
- Automatic size pruning and state cleanup
- Selective persistence via partialize middleware

### Code Splitting Strategy

**Route-Level Splitting:**

- Automatic Next.js optimization for route components
- Dynamic imports for large view components
- Lazy loading for non-critical functionality

**Component-Level Splitting:**

- Lazy loading for heavy components not immediately visible
- Dynamic imports for feature-specific functionality
- Progressive loading for enhanced user experience

**Service-Level Splitting:**

- Lazy loading for non-critical services
- Dynamic imports for specialized adapters
- Tree shaking optimization for unused code

### Bundle Analysis and Optimization

**Analysis Tools:**

```bash
npm run analyze             # Generate detailed bundle analysis
npm run build              # Production build with optimization
```

**Optimization Targets:**

- Route-level code splitting effectiveness
- Component bundle size optimization
- Service layer tree shaking verification
- Asset optimization and compression strategies

---

## Security and Validation Implementation

### Input Validation Strategy

**Type Safety Reference:** `app/views/pokemon-detail/pokemon-detail.type.ts`

- Runtime type validation with TypeScript interfaces
- Component interface contracts for prop validation
- API response validation with error boundaries

**Data Sanitization Patterns:**

- Input validation at component boundaries
- URL parameter sanitization in route handlers
- API response validation before state updates

**Security Boundaries:**

- Server-side validation for all external inputs
- Client-side validation for user experience
- Type-safe data flow from API to component

### Environment Configuration Security

**Configuration Pattern:** Type-safe environment variable validation

- Startup validation for required configuration values
- Development vs production environment separation
- Error handling for missing or invalid configuration

**Implementation Reference:** Environment validation patterns in service configurations

- API base URL validation and fallbacks
- Feature flag configuration and defaults
- Security token validation and rotation

---

## Testing Architecture Implementation

### Testing Strategy by Layer

**Component Testing Reference:** `app/views/pokemon-detail/pokemon-detail.test.tsx`

- Component behavior and interaction testing with realistic scenarios
- Mock integration for external dependencies (stores, services)
- Accessibility and user experience validation
- Error state handling and edge case coverage

**Hook Testing Reference:** `app/views/pokemon-detail/pokemon-detail.hook.test.ts`

- Custom hook behavior and state management testing
- TanStack Query integration testing with mock responses
- Error handling and loading state verification
- Cache behavior and invalidation testing

**Store Testing Reference:** `app/stores/pokemon-history/pokemon-history.test.ts`

- Store state mutations and persistence validation
- Concurrent operation handling and consistency
- Cross-component state consistency verification
- Persistence middleware behavior testing

### Integration Testing Patterns

**Route Testing:** Server-side data fetching and error handling

- Query function testing with realistic API responses
- Error boundary behavior and fallback UI
- Cache configuration and revalidation testing

**End-to-End Testing:** Complete user workflows through Pokemon Detail

- Navigation and data loading scenarios
- User interaction and state persistence
- Cross-session behavior and data recovery

**API Testing:** Service layer integration and response handling

- HTTP adapter testing with mock services
- Error handling and retry logic validation
- Response transformation and type safety

### Test Configuration

**Test Environment Reference:** `vitest.config.ts`

- Browser API mocking for component testing
- Coverage thresholds and reporting configuration
- Test utility setup and shared mocking patterns

**Coverage Targets:**

- 80% minimum coverage across all layers
- Critical path coverage for business logic
- Error handling and edge case coverage
- Integration point validation

---

## Scalability Implementation Patterns

### Micro-frontend Readiness

**Module Boundaries:** Clear interface definitions support federation

- Well-defined public APIs for view modules
- Service abstraction enabling distributed architectures
- State isolation preventing cross-contamination

**Service Integration:** HTTP adapters enable distributed data fetching

- Consistent API patterns across different services
- Error handling and retry logic abstraction
- Cache coordination for distributed systems

**State Isolation:** Feature-based stores prevent cross-contamination

- Clear boundaries between different application domains
- Minimal dependencies between feature modules
- Consistent patterns for state synchronization

### Evolution Pathways

**Real-time Integration:** WebSocket adapter addition capability

- Service layer abstraction supports additional protocols
- State management patterns enable real-time data flows
- Component patterns support live data updates

**PWA Enhancement:** Service worker integration preparation

- Cache strategies support offline-first patterns
- State persistence enables offline data access
- Component patterns support progressive loading

**Monitoring Integration:** Performance tracking and error reporting hooks

- Service layer provides integration points for monitoring
- Component patterns support performance measurement
- Error boundaries enable comprehensive error tracking

**Implementation Foundation:** Current architecture supports all evolution pathways through:

- Established adapter patterns for new protocols
- Modular organization for independent feature evolution
- Consistent testing patterns for reliable scaling

---

## Next Steps

**Practical Implementation:** See [Development Guide](DEVELOPMENT.md) for complete Pokemon Detail walkthrough and daily development patterns.

**Live Examples:** Explore `/pokemons/pikachu` for working demonstration of all architectural patterns described above.

**Implementation Guidance:** Use Pokemon Detail implementation (`app/views/pokemon-detail/`) as reference for implementing new features following established architectural patterns.
