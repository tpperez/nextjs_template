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
3. **Reference examples:** REST and GraphQL patterns in respective query directories

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
| `npm run analyze`       | Analyze bundle size and composition     |
| `npm run test`          | Execute complete test suite             |
| `npm run test:watch`    | Run tests in watch mode                 |
| `npm run test:ui`       | Run tests with UI interface             |
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

- REST Example: `app/(routes)/(public)/(examples)/pokemons/[name]/query/query.ts` - data fetching implementation
- GraphQL Example: `app/(routes)/(public)/(examples)/pokemons/query/query.ts` - GraphQL query patterns
- Service Configuration: `app/services/http/core/core.ts` - HTTP service configuration

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
  signal?: AbortSignal // Request cancellation
}
```

### Data Fetching Patterns

**Server-Side Data Fetching:**

```typescript
// Query function pattern
export const getDataQuery = async (): Promise<ApiResponse<DataType>> => {
  try {
    const response = await restClient.get<DataType>('/api/data')
    return { success: true, data: response }
  } catch (error) {
    return { success: false, error: 'Failed to fetch data' }
  }
}

// Usage in route component
const data = await getDataQuery()
if (!data.success) {
  notFound()
}
```

**Client-Side Data Fetching:**

```typescript
// Custom hook pattern
export const useDataQuery = (id: string) => {
  return useQuery({
    queryKey: ['data', id],
    queryFn: () => restClient.get<DataType>(`/api/data/${id}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

**Query Directory Structure:** `app/(routes)/(public)/(examples)/pokemons/query/`

## Quality Assurance

### Automated Quality Checks

**Pre-commit Validation Pipeline:**

- TypeScript compilation with strict mode enforcement
- ESLint validation with custom rule configurations
- Prettier code formatting with consistent style
- Vitest test execution with coverage requirements
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

- Verify path mappings in `tsconfig.json` - paths configuration
- Restart TypeScript service in development environment
- Ensure import paths use `@/` prefix for internal modules

**Problem:** Strict type checking violations
**Solution:**

- Define explicit TypeScript interfaces for all data structures
- Reference type definitions: `app/views/pokemon-detail/pokemon-detail.type.ts`
- Check ESLint configuration: `eslint.config.mjs` - TypeScript rules

### Testing Framework Issues

**Problem:** Test discovery and execution failures
**Solution:**

- Verify Vitest configuration: `vitest.config.ts` - test environment setup
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

- Review middleware configuration: `middleware.ts` - CORS headers
- Verify API endpoint URLs in environment configuration
- Check Content Security Policy headers for request blocking

**Problem:** GraphQL query execution failures
**Solution:**

- Validate GraphQL endpoint configuration: `app/services/http/core/core.ts` - GraphQL settings
- Verify query syntax: `app/(routes)/(public)/(examples)/pokemons/query/query.const.ts`
- Check GraphQL adapter configuration and initialization

**Problem:** Cache invalidation and stale data issues
**Solution:**

- Review revalidate values in query configurations
- Verify TanStack Query configuration: `app/services/http/providers/react-query.tsx` - QueryClient options
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

**Next.js Configuration Reference:** `next.config.js`

- Image optimization domains and settings
- Security headers and Content Security Policy
- Bundle analyzer and performance monitoring

**TypeScript Configuration Reference:** `tsconfig.json`

- Strict mode settings and compiler options
- Path mapping and module resolution
- Include and exclude patterns

**ESLint Configuration Reference:** `eslint.config.mjs`

- TypeScript integration and strict rules
- Import sorting and organization
- Code style and formatting rules

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
