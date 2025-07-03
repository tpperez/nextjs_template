# Development Guide

**Navigation:** [README](../README.md) | [Architecture Guide](ARCHITECTURE.md)

---

## Overview

This guide provides comprehensive development standards, workflows, and technical references for contributing to this Next.js template. It covers code conventions, testing strategies, and detailed implementation guidance to ensure consistency and quality across the codebase.

## Quick Reference

### Creating a New View

1. **Create directory:** `app/views/my-view/`
2. **Follow structure:** See [Module Structure](#standard-module-structure) below
3. **Reference example:** `app/views/pokemon-detail/` (complete implementation)

### Adding API Integration

1. **Create query directory:** `app/(routes)/my-route/query/`
2. **Implement data fetching:** Follow [Data Fetching Patterns](#data-fetching-patterns)
3. **Reference examples:** REST at line 6-16, GraphQL at line 8-18 in respective query files

### Component Placement Decision

- **Global usage (3+ modules):** Place in `app/components/ui/`
- **View-specific usage:** Place in `app/views/[view]/components/`
- **Uncertainty:** Start local, promote when reused across modules

---

## Code Standards

### TypeScript Configuration

**Strict TypeScript Requirements:**

- No `any` types permitted (enforced by ESLint)
- Explicit return types required for all functions
- Interface definitions mandatory for all data structures
- Generic types used for reusable component patterns

**Type Definition Guidelines:**

| Use Case            | Convention  | Example                                    |
| ------------------- | ----------- | ------------------------------------------ |
| Component props     | `interface` | `interface IButtonProps`                   |
| Object structures   | `interface` | `interface IUser`                          |
| Union types         | `type`      | `type TUserRole = 'admin' \| 'user'`       |
| Literal unions      | `type`      | `type TVariant = 'primary' \| 'secondary'` |
| Function signatures | `type`      | `type THandler = (id: string) => void`     |

### Naming Conventions

| Element Type            | Convention          | Example                              |
| ----------------------- | ------------------- | ------------------------------------ |
| Files and directories   | `kebab-case`        | `user-profile.tsx`, `auth-service/`  |
| Variables and functions | `camelCase`         | `userName`, `handleSubmit()`         |
| React components        | `PascalCase`        | `Button`, `Modal`, `UserProfile`     |
| View components         | `View + PascalCase` | `ViewHome`, `ViewUserProfile`        |
| Page components         | `Page + PascalCase` | `PageHome`, `PageUserProfile`        |
| Interface definitions   | `I + PascalCase`    | `IUserData`, `IButtonProps`          |
| Type definitions        | `T + PascalCase`    | `TButtonVariant`, `TApiResponse`     |
| Constants               | `UPPER_SNAKE_CASE`  | `API_BASE_URL`, `MAX_RETRY_ATTEMPTS` |

### Function Implementation Standards

**Arrow Function Requirement:**

```typescript
// Correct implementation
const handleFormSubmit = (data: FormData): Promise<void> => {
  return submitFormData(data)
}

// Incorrect - function declarations not permitted
function handleFormSubmit(data: FormData): Promise<void> {
  return submitFormData(data)
}
```

**Explicit Return Requirement:**

```typescript
// Correct - explicit return statement
const getUserDisplayName = (user: IUser): string => {
  return user.firstName + ' ' + user.lastName
}

// Incorrect - implicit returns not allowed
const getUserDisplayName = (user: IUser): string =>
  user.firstName + ' ' + user.lastName
```

## Project Organization

### Standard Module Structure

Every module follows this consistent organization pattern:

```
module-name/
├── index.ts                 # Public exports and module interface
├── module-name.tsx          # Primary component implementation
├── module-name.type.ts      # TypeScript type definitions
├── module-name.const.ts     # Constants and configuration (optional)
├── module-name.hook.ts      # Custom hooks (optional)
├── module-name.util.ts      # Utility functions (optional)
└── components/              # Internal components (optional)
    ├── sub-component/
    │   ├── index.ts
    │   ├── sub-component.tsx
    │   └── sub-component.type.ts
    └── ...
```

**Complete Implementation Example:** `app/views/pokemon-detail/`

**Related Architecture:** [Architecture Guide - Module Organization](ARCHITECTURE.md#module-organization)

### File Placement Guidelines

**Global Placement Criteria:**

- Resource used across 3+ different modules
- Application-wide configuration or constants
- Business domain services and utilities
- Design system components

**Module-Specific Placement Criteria:**

- Resource used exclusively within single module
- Module-specific business logic and utilities
- Internal component implementations
- Context-specific type definitions

**Decision Examples:**

- `app/components/ui/spinner/` - Global UI component
- `app/views/pokemon-detail/components/` - View-specific components
- `app/services/http/` - Global service layer
- `pokemon-detail.hook.ts` - View-specific custom hook

### Import Organization

Import statements are automatically organized by ESLint in this order:

1. React and React-related imports
2. Next.js framework imports
3. External library imports
4. Internal application imports using `@/` alias
5. Relative imports using `./` and `../`
6. CSS and style imports

## Development Workflow

### Branch Management

**Branch Naming Convention:**

```bash
card-123_descriptive-feature-name
```

**Pattern Components:**

- `card-xxx`: Task or story identifier
- `descriptive-name`: Brief feature description in kebab-case
- Always lowercase with underscores separating card number from description

**Alternative for Work Without Cards:**

```bash
initials_feature-description
# Example: jd_user-authentication-refactor
```

### Commit Process

**Interactive Commit Workflow:**

```bash
git add .
git commit  # Opens Commitizen interactive wizard
```

**Automated Quality Validation:**
Pre-commit hooks automatically execute:

1. TypeScript compilation verification
2. Complete test suite execution
3. ESLint validation and automatic fixes
4. Prettier code formatting
5. Commit message format validation

### Development Scripts

| Command                 | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | Start development server with Turbopack |
| `npm run build`         | Create production build                 |
| `npm run test`          | Execute complete test suite             |
| `npm run test:watch`    | Run tests in watch mode                 |
| `npm run test:coverage` | Generate coverage report                |
| `npm run lint`          | Check code quality                      |
| `npm run lint:fix`      | Fix linting issues automatically        |
| `npm run tsc`           | TypeScript compilation check            |

## Testing Strategy

### Testing Philosophy

**Behavior-Driven Testing:**

- Focus on component behavior rather than implementation details
- Test user interactions and expected outcomes
- Validate error states and edge cases comprehensively
- Maintain tests as living documentation of expected behavior

**Co-location Principle:**

- Tests placed adjacent to implementation files
- Easier maintenance and discovery
- Clear association between test and source code
- Simplified refactoring and updates

### Testing Patterns

**Component Testing Standards:**

```typescript
// Focus on user-visible behavior
expect(screen.getByText('Loading...')).toBeInTheDocument()
expect(mockApiCall).toHaveBeenCalledWith(expectedParameters)

// Test error states
expect(screen.getByText('Error occurred')).toBeInTheDocument()
```

**Custom Hook Testing:**

```typescript
// Test hook state changes and side effects
const { result } = renderHook(() => useCustomHook())
expect(result.current.isLoading).toBe(false)
expect(result.current.data).toEqual(expectedData)
```

**Integration Testing:**

```typescript
// Test component interactions
fireEvent.click(screen.getByRole('button'))
await waitFor(() => expect(mockHandler).toHaveBeenCalled())
```

**Testing Structure Reference:** `app/components/ui/spinner/`

## HTTP Service Technical Reference

### Client Implementation

**REST Client Usage:**

```typescript
import { restClient } from '@/app/services/http'

// Basic GET request
const userData = await restClient.get<UserResponse>('/users/123')

// POST with configuration
const result = await restClient.post('/users', userData, {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  revalidate: 3600,
  headers: { Authorization: 'Bearer token' },
})
```

**GraphQL Client Usage:**

```typescript
import { graphqlClient } from '@/app/services/http'

// Query execution
const { data, errors } = await graphqlClient.query(
  GET_USERS_QUERY,
  {
    limit: 10,
    offset: 0,
  },
  {
    baseUrl: 'https://graphql.example.com',
    revalidate: 300,
    tags: ['users'],
  },
)
```

**Implementation References:**

- REST Example: `app/(routes)/(public)/pokemons/[name]/query/query.ts` (lines 6-16)
- GraphQL Example: `app/(routes)/(public)/pokemons/query/query.ts` (lines 8-18)
- Service Configuration: `app/services/http/core/core.ts` (lines 7-20)

### Configuration Options

**HTTP Service Configuration:**

```typescript
// Location: app/services/http/core/core.ts
export const HTTP_CONFIG = {
  BASE_URL: string, // Default API base URL
  DEFAULT_REVALIDATE: number, // Cache duration in seconds
  DEFAULT_TIMEOUT: number, // Request timeout in milliseconds
  DEFAULT_RETRY_COUNT: number, // Number of retry attempts
  DEFAULT_STALE_TIME: number, // Stale time for TanStack Query
}
```

**Request Configuration Interface:**

```typescript
interface RequestOptions {
  baseUrl?: string // Override default base URL
  timeout?: number // Request timeout in milliseconds
  revalidate?: number // Next.js cache revalidation time
  tags?: string[] // Cache tags for invalidation
  headers?: HeadersInit // Custom request headers
  signal?: AbortSignal // Request cancellation signal
}
```

### Error Handling Implementation

**Error Response Structure:**

```typescript
interface HttpError {
  message: string // Human-readable error message
  status: number // HTTP status code
  code?: string // Application-specific error code
  details?: Record<string, unknown> // Additional error context
}
```

**Error Handling Pattern:**

```typescript
try {
  const response = await restClient.get<DataType>('/api/endpoint')
  return {
    success: true,
    data: response,
    error: null,
  }
} catch (error: HttpError) {
  console.error('API request failed:', error.message)
  return {
    success: false,
    data: null,
    error: error.message,
  }
}
```

**Error Handling Reference:** `app/(routes)/(public)/pokemons/query/query.ts` (lines 15-25)

### Adapter Configuration

**Available HTTP Adapters:**

- **FetchRestAdapter** - Native fetch API with Next.js integration (default)
- **AxiosRestAdapter** - Axios library with interceptor support
- **FetchGraphQLAdapter** - Native fetch for GraphQL operations (default)
- **GraphQLRequestAdapter** - graphql-request library implementation

**Adapter Switching Configuration:**

```typescript
// Location: app/services/http/core/core.ts
export const HTTP_ADAPTER_CONFIG = {
  restAdapter: () => new FetchRestAdapter(), // Default REST adapter
  graphqlAdapter: () => new FetchGraphQLAdapter(), // Default GraphQL adapter
}

// To use alternative adapters:
export const HTTP_ADAPTER_CONFIG = {
  restAdapter: () => new AxiosRestAdapter(),
  graphqlAdapter: () => new GraphQLRequestAdapter(),
}
```

## State Management Patterns

### State Classification Guidelines

**Local Component State (React Hooks):**

- Form input data and validation state
- UI component state (modal visibility, dropdown selection)
- Temporary interaction state
- Component-specific derived state

**Global Application State (Zustand):**

- User authentication and session information
- Application-wide preferences and settings
- Persistent user data and configurations
- Cross-component shared state that survives navigation

**Server State (TanStack Query):**

- API response data and caching
- Request state management (loading, error, success)
- Background data synchronization
- Optimistic updates and error recovery

**Decision Criteria:** Use global state when data needs to persist across route changes or is shared between unrelated components.

### Custom Hook Guidelines

**Hook Creation Criteria:**

- Same state logic required in multiple components
- Complex state management with multiple related actions
- Business logic that benefits from encapsulation and reuse

**Hook Naming Standards:**

- Always prefix with `use` followed by descriptive name
- Be specific about functionality: `usePokemonSpecies` vs `useApiRequest`
- Include context when generic: `useFormValidation` vs `useValidation`

**Custom Hook Reference:** `app/views/pokemon-detail/pokemon-detail.hook.ts` (lines 30-70)

## Data Fetching Patterns

### Server-Side vs Client-Side Decision Matrix

**Server-Side Data Fetching (Default Choice):**

- SEO-critical content requiring search engine indexing
- Above-the-fold content for optimal loading performance
- Initial page data that determines page structure
- Static and semi-static content with infrequent updates

**Client-Side Data Fetching (Strategic Usage):**

- Real-time data updates and live notifications
- User interaction responses and form submissions
- Background data refresh and cache updates
- Conditional data loading based on user actions

**Related Architecture:** [Architecture Guide - Data Fetching Strategy](ARCHITECTURE.md#data-fetching-architecture)

### Query Organization Pattern

**Co-location Structure:**

```
app/(routes)/(public)/route-name/
├── page.tsx                 # Route component implementation
└── query/                   # Data fetching module
    ├── index.ts            # Public exports
    ├── query.ts            # Fetch function implementations
    ├── query.const.ts      # GraphQL queries and constants
    └── query.type.ts       # Response type definitions
```

**Organization Benefits:**

- Clear data dependencies for each route
- Route-specific cache configuration and optimization
- Simplified testing and mocking strategies
- Reusable query functions across similar contexts

**Complete Example:** `app/(routes)/(public)/pokemons/query/`

## Quality Assurance

### Automated Quality Checks

**Pre-commit Validation Pipeline:**

- TypeScript compilation with strict mode enforcement
- ESLint validation with custom rule configurations
- Prettier code formatting with consistent style
- Jest test execution with coverage requirements
- Commit message format validation

**Continuous Integration Pipeline:**

- Cross-browser and cross-environment testing
- Build verification and deployment readiness checks
- Code quality metrics and technical debt analysis
- Security vulnerability scanning and reporting

### Code Quality Metrics

**Target Quality Standards:**

- Test coverage minimum: 80% for new code
- TypeScript strict mode compliance: 100%
- ESLint error tolerance: Zero errors allowed
- Build success rate: 100% for main branch
- Performance budget: Core Web Vitals compliance

### Performance Guidelines

**Bundle Optimization Strategies:**

- Dynamic imports for heavy components and libraries
- Image optimization using Next.js Image component
- Code splitting at route and component boundaries
- Tree shaking verification and unused code elimination

**Runtime Performance Standards:**

- Core Web Vitals monitoring and optimization
- Client-side state size minimization
- Efficient re-rendering patterns and memoization
- Memory leak prevention and cleanup

## Common Issues and Solutions

### TypeScript Configuration Issues

**Problem:** Module resolution errors with path aliases
**Solution:**

- Verify path mappings in `tsconfig.json` (lines 22-24)
- Restart TypeScript service in development environment
- Ensure import paths use `@/` prefix for internal modules

**Problem:** Strict type checking violations
**Solution:**

- Define explicit TypeScript interfaces for all data structures
- Reference type definitions: `app/views/pokemon-detail/pokemon-detail.type.ts`
- Check ESLint configuration: `eslint.config.mjs` (line 32)

### Testing Framework Issues

**Problem:** Test discovery and execution failures
**Solution:**

- Verify Jest configuration: `jest.config.ts` (lines 8-12)
- Ensure test file naming follows convention: `*.test.tsx` or `*.spec.tsx`
- Reference working test structure: `app/components/ui/spinner/`

**Problem:** Async test timeouts and race conditions
**Solution:**

- Use `waitFor` utility for asynchronous operations
- Implement proper API call mocking strategies
- Verify TanStack Query test setup and configuration

### Development Environment Issues

**Problem:** Development server port conflicts
**Solution:** Use alternative port: `npm run dev -- -p 3001`

**Problem:** Hot module reload functionality not working
**Solution:**

- Restart development server completely
- Verify file extensions in `tsconfig.json` include configuration
- Confirm Turbopack is enabled in `package.json` dev script

### Build and Deployment Issues

**Problem:** Production build failures with type errors
**Solution:**

- Execute `npm run tsc` to identify compilation issues
- Verify all exported types have proper interface definitions
- Remove unused imports and unreachable code

**Problem:** Bundle size exceeding performance budget
**Solution:**

- Implement dynamic imports for heavy dependencies
- Analyze bundle composition using webpack-bundle-analyzer
- Verify tree shaking configuration and effectiveness

### HTTP Service Integration Issues

**Problem:** CORS policy violations in API requests
**Solution:**

- Review middleware configuration: `middleware.ts` (lines 15-20)
- Verify API endpoint URLs in environment configuration
- Check Content Security Policy headers for request blocking

**Problem:** GraphQL query execution failures
**Solution:**

- Validate GraphQL endpoint configuration: `app/services/http/core/core.ts` (line 8)
- Verify query syntax: `app/(routes)/(public)/pokemons/query/query.const.ts`
- Check GraphQL adapter configuration and initialization

**Problem:** Cache invalidation and stale data issues
**Solution:**

- Review revalidate values in query configurations
- Verify TanStack Query configuration: `app/services/http/providers/react-query.tsx` (lines 10-20)
- Clear browser cache and restart development server

### Performance and Optimization Issues

**Problem:** Poor Core Web Vitals scores
**Solution:**

- Implement proper image optimization and lazy loading
- Reduce JavaScript bundle size through code splitting
- Optimize font loading and rendering strategies

**Problem:** Memory leaks in client-side applications
**Solution:**

- Implement proper cleanup in useEffect hooks
- Cancel pending requests on component unmount
- Monitor memory usage in development tools

## Technical Reference

### Environment Configuration

**Required Environment Variables:**

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NODE_ENV=development|production|test
```

**Optional Configuration:**

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://graphql.example.com
API_TIMEOUT=10000
CACHE_DURATION=300
```

### Build Configuration

**Next.js Configuration Reference:** `next.config.ts`

- Image optimization domains and settings
- Security headers and Content Security Policy
- Bundle analyzer and performance monitoring

**TypeScript Configuration Reference:** `tsconfig.json`

- Strict mode settings and compiler options
- Path mapping and module resolution
- Include and exclude patterns

### IDE Configuration

**VS Code Settings Reference:** `.vscode/settings.json`

- TypeScript service configuration
- ESLint and Prettier integration
- Tailwind CSS IntelliSense settings

**Recommended Extensions:** `.vscode/extensions.json`

- Essential development tools and utilities
- Code quality and formatting extensions
- Framework-specific language support

## Next Steps

**For architectural understanding:** Review [Architecture Guide](ARCHITECTURE.md) for system design and decision rationale.

**For project navigation:** Return to [README](../README.md) for high-level overview and quick start instructions.

**For practical implementation:** Examine Pokemon examples throughout the codebase for real-world application of these development standards.
