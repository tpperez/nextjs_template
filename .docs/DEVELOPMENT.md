# Development Guide

**Navigation:** [README](../README.md) | [Architecture Guide](ARCHITECTURE.md)

---

## Overview

Daily development patterns, coding conventions, and implementation guidelines for contributors working on the codebase. This guide provides practical implementation guidance using Pokemon Detail as a complete working example.

**Live Reference:** `/pokemons/pikachu` demonstrates all patterns described below.

---

## Code Organization

### Project Directory Structure

**Complete Application Structure:**

```bash
app/
├── (routes)/                           # next.js app router structure
│   ├── (auth)/                         # authentication-protected routes
│   ├── (public)/                       # publicly accessible routes
│   │   └── (examples)/                 # demonstration features
│   │       └── pokemons/               # pokemon examples
│   │           ├── page.tsx            # pokemon list route
│   │           └── [name]/             # dynamic pokemon detail route
│   │               ├── page.tsx        # pokemon detail page component
│   │               └── queries/        # server-side data fetching
│   │                   ├── get-pokemon-detail.query.ts
│   │                   └── get-pokemon-detail.type.ts
│   └── api/                            # api route handlers
├── components/                         # global reusable components
│   ├── structure/                      # layout and navigation components
│   └── ui/                            # design system components (no suffix)
│       ├── button.tsx
│       ├── input.tsx
│       └── spinner.tsx
├── constants/                          # global application constants (no suffix)
├── hooks/                             # global custom react hooks (no suffix)
├── services/                          # global business services (no suffix)
│   └── http/                          # http client adapters
│       ├── rest-client.ts
│       ├── graphql-client.ts
│       └── index.ts
├── stores/                            # global state management
│   └── pokemon-history/               # feature-based store module (with suffix)
│       ├── pokemon-history.ts         # store implementation
│       ├── pokemon-history.type.ts    # store type definitions
│       ├── pokemon-history.const.ts   # store constants
│       ├── pokemon-history.test.ts    # store tests
│       └── index.ts                   # public exports
├── styles/                            # global stylesheets (no suffix)
├── typings/                          # global type definitions (no suffix)
├── utils/                            # global utility functions (no suffix)
└── views/                            # page orchestrators and business logic
    └── pokemon-detail/               # complete view module (with suffix)
        ├── pokemon-detail.tsx        # main view component
        ├── pokemon-detail.hook.ts    # client-side data fetching hooks
        ├── pokemon-detail.type.ts    # view-specific type definitions
        ├── pokemon-detail.const.ts   # view-specific constants
        ├── pokemon-detail.util.ts    # view-specific utilities
        ├── pokemon-detail.test.tsx   # component tests
        ├── components/               # view-specific sub-components
        │   ├── pokemon-moves/        # sub-component module
        │   │   ├── pokemon-moves.tsx
        │   │   ├── pokemon-moves.test.tsx
        │   │   └── index.ts
        │   └── pokemon-species-info/
        │       ├── pokemon-species-info.tsx
        │       ├── pokemon-species-info.test.tsx
        │       └── index.ts
        └── index.ts                  # public exports
```

### Directory Classification System

**Typed Directories (Plural Names, No Suffix):**

- **Purpose:** Single file type per directory, type indicated by directory name
- **Pattern:** `components/ui/button.tsx`, `utils/format-date.ts`, `services/api.ts`
- **Examples:** `components/`, `hooks/`, `utils/`, `services/`, `constants/`
- **Rationale:** Directory name clearly indicates file type, no suffix needed

**Module Directories (Singular Names, With Suffix):**

- **Purpose:** Multiple related file types, suffix clarifies file purpose
- **Pattern:** `pokemon-detail/pokemon-detail.tsx`, `pokemon-history/pokemon-history.ts`
- **Examples:** `views/pokemon-detail/`, `stores/pokemon-history/`
- **Rationale:** Multiple file types require suffix for clarity

### Module Organization Patterns

#### View Module Structure

**Reference Implementation:** `app/views/pokemon-detail/`

```bash
pokemon-detail/
├── pokemon-detail.tsx              # main component (required)
├── pokemon-detail.hook.ts          # custom hooks for client-side data
├── pokemon-detail.type.ts          # typescript interfaces and types
├── pokemon-detail.const.ts         # module-specific constants
├── pokemon-detail.util.ts          # utility functions for this view
├── pokemon-detail.test.tsx         # component testing
├── components/                     # view-specific sub-components
│   ├── pokemon-moves/              # sub-component with own module structure
│   │   ├── pokemon-moves.tsx       # sub-component implementation
│   │   ├── pokemon-moves.test.tsx  # sub-component tests
│   │   └── index.ts               # sub-component public exports
│   └── pokemon-species-info/       # another sub-component module
│       ├── pokemon-species-info.tsx
│       ├── pokemon-species-info.test.tsx
│       └── index.ts
└── index.ts                       # view module public exports
```

#### Store Module Structure

**Reference Implementation:** `app/stores/pokemon-history/`

```bash
pokemon-history/
├── pokemon-history.ts              # zustand store implementation
├── pokemon-history.type.ts         # store interface definitions
├── pokemon-history.const.ts        # store configuration constants
├── pokemon-history.test.ts         # store behavior testing
└── index.ts                       # store module public exports
```

#### Route Module Structure

**Reference Implementation:** `app/(routes)/(public)/(examples)/pokemons/[name]/`

```bash
[name]/
├── page.tsx                        # next.js route component
├── loading.tsx                     # loading ui (optional)
├── error.tsx                       # error boundary (optional)
└── queries/                        # server-side data fetching
    ├── get-pokemon-detail.query.ts # query function implementation
    └── get-pokemon-detail.type.ts  # query-specific type definitions
```

### File Relationship Patterns

#### Data Flow Relationships

**Pokemon Detail Example Flow:**

1. **Route Component** (`page.tsx`)

   - Imports: `queries/get-pokemon-detail.query.ts`
   - Calls: `getPokemonDetailData()`
   - Passes data to: `views/pokemon-detail`

2. **View Component** (`pokemon-detail.tsx`)

   - Imports: `pokemon-detail.hook.ts`, `pokemon-detail.type.ts`
   - Uses: Custom hooks for client-side data
   - Imports: Store from `stores/pokemon-history`
   - Renders: Sub-components from `components/`

3. **Custom Hook** (`pokemon-detail.hook.ts`)

   - Imports: `services/http/graphql-client.ts`
   - Uses: TanStack Query for client-side data fetching
   - Returns: Formatted data for component consumption

4. **Store Integration** (`stores/pokemon-history`)
   - Imported by: `pokemon-detail.tsx`
   - Manages: Cross-session state persistence
   - Provides: History tracking functionality

#### Dependency Hierarchy

```
Route (page.tsx)
    ↓ imports query
Query (get-pokemon-detail.query.ts)
    ↓ uses service
Service (services/http/rest-client.ts)
    ↓ makes HTTP request
External API

Route (page.tsx)
    ↓ renders view
View (pokemon-detail.tsx)
    ↓ uses hook
Hook (pokemon-detail.hook.ts)
    ↓ uses service
Service (services/http/graphql-client.ts)
    ↓ makes GraphQL request
External API

View (pokemon-detail.tsx)
    ↓ uses store
Store (stores/pokemon-history)
    ↓ persists to
Browser Storage
```

### Suffix Usage Patterns

#### When to Use Suffixes

**Required Suffixes (Module Files):**

- **`.tsx` or `.ts`:** Always required for module main files
- **`.type.ts`:** When module has custom TypeScript interfaces
- **`.hook.ts`:** When module has custom React hooks
- **`.const.ts`:** When module has configuration constants
- **`.util.ts`:** When module has utility functions
- **`.test.tsx/.test.ts`:** Always required for test files

**Reference Example:** `pokemon-detail` module demonstrates all suffix patterns

#### Suffix Relationships

**Main Component Suffixes:**

```bash
pokemon-detail.tsx              # main component
pokemon-detail.type.ts          # types used by main component
pokemon-detail.hook.ts          # hooks used by main component
pokemon-detail.const.ts         # constants used by main component
pokemon-detail.util.ts          # utils used by main component
pokemon-detail.test.tsx         # tests for main component
```

**Import Relationships:**

- `pokemon-detail.tsx` imports from all other `pokemon-detail.*` files
- Test files import from their corresponding implementation files
- `index.ts` imports from all module files for public exports

### Global vs Module-Specific Decision Matrix

#### Global Placement Criteria

- **Usage:** Used across 3+ different modules
- **Scope:** Core infrastructure, design system, shared utilities
- **Examples:** `components/ui/button.tsx`, `services/http/`, `utils/format-date.ts`

#### Module-Specific Placement Criteria

- **Usage:** Used exclusively within one feature or context
- **Scope:** Feature-specific logic, view-specific components
- **Examples:** `pokemon-detail.hook.ts`, `pokemon-moves.tsx`, `pokemon-history.ts`

#### Decision Examples

**Global:** Button component → `app/components/ui/button.tsx`

- **Reason:** Used across multiple views and features

**Module-Specific:** Pokemon moves → `app/views/pokemon-detail/components/pokemon-moves/`

- **Reason:** Only used within Pokemon Detail view

**Global:** HTTP service → `app/services/http/rest-client.ts`

- **Reason:** Used by multiple route queries and hooks

**Module-Specific:** Pokemon species hook → `app/views/pokemon-detail/pokemon-detail.hook.ts`

- **Reason:** Only used within Pokemon Detail view

---

## Example Walkthrough: Pokemon Detail Implementation

### Complete Feature Demonstration

**Live Example:** `/pokemons/pikachu`
**Implementation Path:** Server-side data → Client-side enhancement → State management → Testing

This walkthrough demonstrates every architectural pattern in the codebase through a working implementation.

### Server-Side Data Layer

**Route Structure:** `app/(routes)/(public)/(examples)/pokemons/[name]/`

**Query Implementation Reference:** `queries/get-pokemon-detail.query.ts`

- REST adapter usage with Next.js caching configuration
- Error handling with result wrapper pattern
- Type-safe response transformation

**Route Component Reference:** `page.tsx`

- Server component data fetching integration
- Error boundary and not-found handling
- Data passing to view layer

**Key Pattern:** Server-first approach for SEO and performance optimization.

**Note:** REST adapter chosen for Pokemon Detail initial data, but GraphQL adapter equally viable for server-side usage.

### Client-Side Enhancement Layer

**View Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.tsx`

- Server data consumption through props
- Client-side data enhancement integration
- State management coordination
- Component composition orchestration

**Custom Hook Reference:** `pokemon-detail.hook.ts`

- TanStack Query configuration for dynamic data
- GraphQL adapter usage for moves data
- Cache management with stale-while-revalidate
- Error handling and loading states

**Key Pattern:** Progressive enhancement without blocking initial render.

**Note:** GraphQL adapter chosen for Pokemon moves data, but REST adapter equally viable for client-side dynamic updates.

### State Management Integration

**Store Implementation Reference:** `app/stores/pokemon-history/pokemon-history.ts`

- Zustand store with persistence middleware
- Type-safe actions and mutations
- Automatic history size management

**Integration Pattern Reference:** Pokemon Detail component useEffect

- Automatic history updates on navigation
- Store state subscription and updates
- Cross-session persistence demonstration

**Key Pattern:** Feature-based stores with selective persistence.

### Component Architecture

**Module Organization:** `app/views/pokemon-detail/components/`

- **Pokemon Moves:** `pokemon-moves/pokemon-moves.tsx` - GraphQL client-side data within TanStack Query
- **Pokemon Species Info:** `pokemon-species-info/` - Additional REST data within TanStack Query
- **View-specific components** with clear boundaries

**Form Handling Example:** `app/views/pokemons/components/pokemon-search/`

- **React Hook Form Integration:** Type-safe form validation and submission
- **Search Functionality:** Real-time search with GraphQL adapter within TanStack Query
- **Form State Management:** Minimal re-renders with optimized form handling

**Key Pattern:** Co-located components with focused responsibilities and proper form integration.

---

## Feature Development Workflow

### 1. Data Layer Implementation

**Server-Side Query Setup:**

- Create query function in route `queries/` directory
- Choose appropriate adapter (REST/GraphQL) based on data requirements
- Implement error handling with result wrapper
- Add comprehensive testing coverage

**Reference Implementation:** `get-pokemon-detail.query.ts`

- REST adapter configuration with baseUrl override (GraphQL equally viable)
- Next.js revalidation configuration (3600s)
- Type-safe error handling and response transformation

### 2. Route Component Development

**Server Component Pattern:**

- Consume query function for initial data fetching
- Handle error states with notFound() or error boundaries
- Pass validated data to view component
- Configure loading UI and error boundaries

**Reference Implementation:** `page.tsx`

- Async server component with data fetching
- Error handling with conditional notFound()
- Clean data passing to view layer

### 3. View Component Implementation

**View Component Pattern:**

- Accept server data through typed props interface
- Coordinate multiple data sources (server + client)
- Integrate state management where needed
- Compose sub-components with clear data flow

**Reference Implementation:** `pokemon-detail.tsx`

- Props interface for server data
- Client-side hook integration for additional data
- Store integration for cross-session state
- Component composition with sub-components

### 4. Client Enhancement Addition

**Custom Hook Development:**

- Configure TanStack Query for client-side data
- Choose appropriate adapter (REST/GraphQL) based on data requirements
- Implement proper cache management
- Handle loading, error, and success states

**Reference Implementation:** `pokemon-detail.hook.ts`

- TanStack Query configuration with proper cache keys
- GraphQL adapter integration with type safety (REST equally viable)
- Error handling and retry logic
- Cache configuration for optimal UX

### 5. State Management Integration

**Store Development:**

- Create feature-specific Zustand store
- Configure persistence middleware for cross-session state
- Implement type-safe actions and selectors
- Add comprehensive testing coverage

**Reference Implementation:** `pokemon-history.ts`

- Zustand store with persistence middleware
- Type-safe store interface and actions
- Size management and state pruning
- Testing coverage for all store behaviors

### 6. React Hook Form Integration

**Form Implementation Pattern:**

- Use React Hook Form for type-safe form handling
- Integrate with TanStack Query for form submission
- Implement proper validation and error handling
- Minimize re-renders with optimized form state

**Reference Implementation:** `app/views/pokemons/components/pokemon-search/pokemon-search.tsx`

- useForm hook with register pattern
- handleSubmit integration with onSearch callback
- Form state management with watch and reset
- Loading state handling and disabled states

**Form + Query Integration Reference:** `app/views/pokemons/components/pokemon-search/pokemon-search.hook.ts`

- usePokemonNameSearch hook integrates form submission with TanStack Query
- Enabled based on search term validation
- Proper error handling and loading states

**Benefits:**

- **Type Safety:** Form data validated at compile time
- **Performance:** Minimal re-renders with register pattern
- **Integration:** Seamless connection with TanStack Query
- **UX:** Loading states and error handling built-in

### 7. HTTP Adapter Selection

**Universal Adapter Usage:**
Both REST and GraphQL adapters work in server and client contexts. Choose based on data requirements:

**REST Adapter Usage:**

- **Server-side:** Route queries, API handlers (`get-pokemon-detail.query.ts`)
- **Client-side:** Within TanStack Query hooks for simple CRUD operations
- **Benefits:** Familiar patterns, excellent caching, straightforward implementation

**GraphQL Adapter Usage:**

- **Server-side:** Complex server-side queries, data aggregation
- **Client-side:** Within TanStack Query hooks for dynamic queries, field selection (`pokemon-detail.hook.ts`)
- **Benefits:** Precise data fetching, real-time subscriptions, type safety

**Client-Side Integration Examples:**

- **REST within TanStack Query:** `app/views/pokemon-detail/pokemon-detail.hook.ts` - usePokemonSpecies function
- **GraphQL within TanStack Query:** `app/views/pokemon-detail/pokemon-detail.hook.ts` - usePokemonMovesGraphQL function
- **Search Integration:** `app/views/pokemons/components/pokemon-search/pokemon-search.hook.ts` - usePokemonNameSearch function

**Adapter Selection Criteria:**

- **Data Complexity:** GraphQL for complex queries, REST for simple operations
- **Caching Needs:** REST for simple caching, GraphQL for intelligent cache management
- **Real-time Requirements:** GraphQL for subscriptions, REST for traditional polling
- **Team Familiarity:** Choose based on team expertise and project requirements
- **Client-Side Rule:** Always use within TanStack Query hooks, never directly in components

**Switching Adapters:**

- **Configuration Reference:** `app/services/http/core/core.ts`
- **Available Alternatives:** AxiosRestAdapter, GraphQLRequestAdapter
- **Implementation References:** `app/services/http/rest/adapters/` and `app/services/http/graphql/adapters/`

---

## Testing Implementation Strategy

### Component Testing Patterns

**Reference Implementation:** `pokemon-detail.test.tsx`

**Testing Approach:**

- Mock external dependencies (stores, hooks, services)
- Test component rendering and user interactions
- Verify accessibility attributes and behavior
- Test error states and edge cases

**Key Patterns:**

- `vi.mock()` for store and hook dependencies
- `screen.getByRole()` for accessibility testing
- `render()` with custom test utilities
- Mock data with realistic structure

**Reference Implementation:** `app/views/pokemon-detail/pokemon-detail.test.tsx`

- Store mocking patterns with usePokemonHistoryStore
- Component rendering tests with mock data
- Accessibility testing with proper screen queries
- Error state and edge case coverage

### Form Testing Patterns

**Reference Implementation:** `pokemon-search.test.tsx`

**Testing Approach:**

- Test form submission and validation
- Mock TanStack Query integration
- Test loading states and user interactions
- Verify form reset and error handling

**Key Patterns:**

- **Form submission testing:** fireEvent input and click interactions
- **Loading state verification:** disabled states and button text changes
- **Form validation:** proper handling of empty and invalid inputs
- **Integration testing:** form submission triggering search callbacks

**Test Coverage Areas:**

- Form input validation and user interactions
- Loading state management during form submission
- Clear functionality and form reset behavior
- Integration with search functionality and query triggers

### Hook Testing Patterns

**Reference Implementation:** `pokemon-detail.hook.test.ts`

**Testing Approach:**

- Use `renderHook` with TanStack Query wrapper
- Mock HTTP adapter responses (not TanStack Query directly)
- Test cache configuration and behavior
- Verify error handling and retry logic

**Key Patterns:**

- Custom query wrapper for TanStack Query testing
- Mock service layer with realistic responses
- `waitFor()` for async operations
- State transition testing

**TanStack Query + Adapter Integration Testing:**

- **Reference Implementation:** `app/views/pokemon-detail/pokemon-detail.hook.test.ts`
- Mock HTTP adapters (restClient, graphqlClient) not TanStack Query directly
- Custom QueryClientProvider wrapper for hook testing
- Test cache configuration and adapter integration
- Verify error handling and retry logic with mocked responses

**Testing Pattern:**

- renderHook with TanStack Query wrapper
- Mock service layer (restClient.get, graphqlClient.query)
- waitFor async operations and state updates
- Test both REST and GraphQL adapter integrations within hooks

### Store Testing Patterns

**Reference Implementation:** `pokemon-history.test.ts`

**Testing Approach:**

- Test store state mutations and persistence
- Verify concurrent operation handling
- Test persistence middleware behavior
- Validate state consistency across multiple hook instances

**Key Patterns:**

- `renderHook` for store testing
- `act()` for state mutations
- Multiple hook instance testing for consistency
- Persistence middleware mocking

### Integration Testing Strategy

**API Query Testing:**

- Mock HTTP service responses
- Test query functions with realistic data
- Verify error handling and transformation
- Test caching behavior and configuration

**Route Testing:**

- Test server component data fetching
- Verify error handling (404, 500, etc.)
- Test loading states and boundaries
- Validate data passing to view components

---

## Performance Optimization

### Implementation Patterns

**Code Splitting Reference:** Pokemon Detail components

- Route-level automatic splitting via Next.js
- Component-level dynamic imports for heavy components
- Service-level lazy loading for non-critical functionality

**Cache Optimization Reference:** Pokemon Detail data flow

- **Server-side:** ISR with 1-hour revalidation (direct adapter usage)
- **Client-side:** TanStack Query with 5-minute stale time (adapter within queryFn)
- **Store:** Cross-session persistence with selective serialization

**Client-Side Caching Architecture:**

- **Implementation Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts`
- TanStack Query manages cache, HTTP adapter executes transport
- Cache configuration with staleTime and gcTime
- Proper separation between cache logic and request execution

**Layer Separation Benefits:**

- **TanStack Query:** Cache invalidation, background updates, deduplication
- **HTTP Adapters:** Request execution, response transformation, error handling
- **Performance:** Cache layer independent of transport implementation

### Bundle Analysis

**Analysis Commands:**

```bash
npm run analyze             # Generate bundle analysis
npm run build              # Production build verification
```

**Optimization Targets:**

- Route-level code splitting effectiveness
- Component bundle size optimization
- Service layer tree shaking verification
- Asset optimization and compression

---

## Development Workflow

### Daily Development Commands

```bash
# Development workflow
npm run dev                 # start with hot reload
npm run test:watch          # run tests in watch mode
npm run lint && npm run tsc # check code quality

# Feature development
npm run test:coverage       # verify test coverage
npm run format:fix          # fix formatting issues
npm run analyze             # analyze bundle size
```

### Quality Assurance Pipeline

**Pre-commit Validation:**

1. TypeScript compilation check
2. ESLint validation with auto-fix
3. Prettier formatting verification
4. Test suite execution
5. Conventional commit message validation

**Configuration References:**

- **ESLint:** `eslint.config.mjs`
- **Prettier:** `prettier.config.js`
- **TypeScript:** `tsconfig.json`
- **Testing:** `vitest.config.ts`
- **Git Hooks:** `.husky/` directory

### Branch Management and Commits

**Branch Naming Convention:**

```bash
# With ticket/card number
card-123_pokemon-search-feature

# Without card number
jd_pokemon-detail-optimization
```

**Commit Process:**

```bash
git add .
git commit  # Opens Commitizen wizard
```

**Conventional Commits:** Enforced through Commitizen with automatic conventional commit message generation.

---

## Error Handling and Debugging

### Multi-Layer Error Strategy

**Route Level:** `notFound()` for 404 states and error boundaries
**Query Level:** Result wrapper with success/error states
**Component Level:** Conditional rendering and fallback UI
**Hook Level:** TanStack Query error integration with retry logic

**Implementation Reference:** Pokemon Detail demonstrates all error handling layers.

### Debugging Patterns

**Development Tools:**

- React DevTools for component inspection
- TanStack Query DevTools for cache inspection
- Zustand DevTools for state debugging
- Next.js debugging with source maps

**Logging Strategy:**

- Console logging in development environment
- Error boundary integration for production
- API error logging and reporting
- Performance monitoring integration points

---

## Troubleshooting Guide

### Common Development Issues

**Cache Problems:**

- Clear Next.js cache: `rm -rf .next && npm run dev`
- Clear TanStack Query cache: Browser DevTools → Application → Storage
- Clear store persistence: Browser DevTools → Application → Local Storage

**Type Errors:**

- Restart TypeScript server in VSCode
- Run `npm run tsc` for compilation verification
- Check for outdated type definitions

**Test Failures:**

- Clear test cache: `npm run test -- --clearCache`
- Update snapshots: `npm run test -- --updateSnapshot`
- Check mock implementations for changes

### Environment Issues

**Port Conflicts:**

```bash
npm run dev -- --port 3001  # Use different port
```

**Dependency Issues:**

```bash
rm -rf node_modules package-lock.json
npm install                  # Fresh dependency installation
```

**Build Issues:**

```bash
npm run build               # Check production build
npm run tsc                 # TypeScript compilation check
npm run lint               # Code quality verification
```

---

## Next Steps

**Architecture Understanding:** Review [Architecture Guide](ARCHITECTURE.md) for design decisions and patterns.

**Live Implementation:** Explore Pokemon Detail at `/pokemons/pikachu` to see all patterns in action.

**Feature Development:** Use Pokemon Detail as template for implementing new features following established patterns.
