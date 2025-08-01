# Testing Framework

Testing patterns and configurations for this Next.js template. The template provides working examples of component, hook, service, and store testing that teams can reference and extend for their applications.

---

## Table of Contents

1. [Testing Strategy Guidance](#testing-strategy-guidance)
2. [Environment Setup Reference](#environment-setup-reference)
3. [Component Testing Patterns](#component-testing-patterns)
4. [Hook Testing Guidelines](#hook-testing-guidelines)
5. [Service Testing Approaches](#service-testing-approaches)
6. [Mocking Strategy Reference](#mocking-strategy-reference)
7. [Testing Utilities Guide](#testing-utilities-guide)
8. [Quality Standards Implementation](#quality-standards-implementation)
9. [Team Workflow Integration](#team-workflow-integration)

## Related Documentation

- [Code Quality](./code-quality.md) - Quality standards integration and automated testing gates
- [Contributing](./contributing.md) - Testing workflow requirements and development standards
- [Scripts](./scripts.md) - Test execution commands and development scripts
- [Data Fetching](./data-fetching.md) - Service testing patterns and HTTP client validation
- [State Management](./state-management.md) - State testing patterns and store validation
- [Authentication](./authentication.md) - Authentication testing and security validation
- [Stack](./stack.md) - Testing framework technology and configuration
- [Examples](./examples.md) - Practical testing implementation examples

---

## Testing Strategy Guidance

### Implemented Testing Patterns

The template demonstrates testing patterns through real implementations across different layers of the application. Teams can follow these established patterns when building their applications.

| Testing Pattern       | Implementation Examples                     | Test Files                                                  |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------- |
| **Component Testing** | Button, Spinner, domain-specific components | `button.test.tsx`, `spinner.test.tsx`, `component.test.tsx` |
| **Hook Testing**      | Data fetching, search, business logic       | `data-fetching.hook.test.ts`, `search.hook.test.ts`         |
| **Service Testing**   | REST client, GraphQL client, HTTP adapters  | `rest.test.ts`, `graphql.test.ts`, `fetch-rest.test.ts`     |
| **Store Testing**     | Zustand state management, persistence       | `store.test.ts`                                             |
| **Utility Testing**   | Formatters, helpers, pure functions         | `utils.test.ts`, `cn.test.ts`                               |
| **View Testing**      | Page components, integration                | `view.test.tsx`, `page.test.tsx`, `home.test.tsx`           |

**Testing Infrastructure:**

- **Test Runner**: [Vitest](https://vitest.dev/) with jsdom environment
- **Component Testing**: [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) with semantic queries
- **Type Safety**: TypeScript integration throughout test suite
- **Coverage**: 80% threshold across branches, functions, lines, statements

### Testing Approach from Real Implementation

**Component Testing Patterns:**

The template demonstrates component testing through UI components like `Button` and `Spinner`, as well as domain-specific components and complex feature components. Tests focus on rendering, user interactions, and integration with stores.

**Hook Testing Implementation:**

Custom hooks receive testing as shown in entity-specific hook tests. These tests validate data fetching, loading states, error handling, and cache behavior with [TanStack Query](https://tanstack.com/query/latest) integration.

**Service Layer Testing:**

Both REST and GraphQL clients have test coverage demonstrating request handling, response processing, error scenarios, and TypeScript integration. The template shows how to test HTTP adapters and service methods.

**Store Integration Testing:**

Entity history stores demonstrate testing of [Zustand](https://zustand-demo.pmnd.rs/) state management, including state mutations, persistence behavior, and edge cases like duplicate handling and size limits.

**Quality Standards Implementation:**

The template enforces 80% coverage thresholds across all test types, focusing on business logic while excluding configuration files. Tests emphasize user behavior over implementation details.

### File Organization Patterns

**Naming Conventions from Implementation:**

- **Component tests**: `component.test.tsx`
- **Hook tests**: `hook-name.hook.test.ts`
- **Service tests**: `service-name.test.ts`
- **Utility tests**: `utility-name.test.ts`
- **View tests**: `view-name.test.tsx`

**Co-location Strategy:**

Tests are co-located with their implementations, where components, hooks, and tests are grouped together for maintainability.

### Testing Philosophy from Template Implementation

**User-Centric Testing Approach:**

The template uses [React Testing Library](https://testing-library.com/) with semantic queries like `getByRole` and `getByLabelText`. This approach ensures components work correctly for actual users and remain stable during refactoring.

**Quality Standards Applied:**

The template implements 80% coverage thresholds across branches, functions, lines, and statements. Coverage focuses on business logic (components, hooks, services, stores, utilities) while excluding configuration files and generated content.

**Test Organization Strategy:**

Tests are co-located with their implementations and follow consistent naming patterns. The examples demonstrate how to structure tests for maintainability and clarity, with clear separation between component behavior, hook logic, and service integration.

---

## Environment Setup Reference

### Vitest Configuration Guide

The template provides a production-ready [Vitest](https://vitest.dev/) configuration for React applications. Teams can customize this foundation while maintaining essential testing capabilities.

**Key Configuration Elements:**

- **Test Runner**: Vitest with React plugin for JSX support
- **Environment**: jsdom for browser API simulation
- **Setup**: Global test setup in `vitest.setup.ts`
- **Coverage**: V8 provider with 80% thresholds
- **Development**: Watch mode and UI mode for debugging
- **TypeScript**: Full type safety integration

**Configuration Foundation:** [`vitest.config.ts`](../vitest.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
})
```

### Global Setup Recommendations

The template includes essential global configurations that teams should maintain and extend based on their application needs.

**Setup Foundation:** [`vitest.setup.ts`](../vitest.setup.ts)

```typescript
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Next.js component mocks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
}))

// Additional framework mocks
vi.mock('next/image', () => ({
  default: vi.fn(() => 'NextImage'),
}))
```

**Setup Guidelines for Teams:**

- **Framework Mocks**: Maintain [Next.js mocks](https://nextjs.org/docs/app/building-your-application/testing/vitest) for consistent testing environment
- **Browser API Simulation**: Add mocks for browser APIs not available in jsdom as needed
- **Global Test Utilities**: Include shared testing utilities that apply across your entire application
- **Environment Configuration**: Set up test-specific environment variables and configurations

---

## Component Testing Patterns

### User-Centric Testing Approach

When testing components built with this template, prioritize user interactions and accessibility over implementation details. This approach creates resilient tests that support long-term maintainability.

**Component Testing Approach:**

- **User Interactions**: Test real user behavior, not implementation details
- **Semantic Queries**: Use `getByRole`, `getByLabelText` for accessibility
- **Visual Validation**: Test CSS classes and design system integration
- **Props Testing**: Validate component API and prop variations
- **Test Organization**: Group tests by feature with clear describe blocks
- **Accessibility**: Ensure components work with screen readers

**Component Testing Example:**

```typescript
describe('Button Component', () => {
  it('should render correctly with default props', () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('should handle user interactions', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Component Testing Guidelines for Teams

**Rendering Validation:**

Test component rendering with various props and states using semantic queries. Focus on what users see and interact with rather than internal component structure.

**Interaction Testing:**

Validate user interactions like clicks, form submissions, and keyboard navigation. Test the complete interaction cycle from user action to expected outcome.

**Accessibility Integration:**

Use semantic queries (`getByRole`, `getByLabelText`) that validate [accessibility patterns](https://testing-library.com/docs/queries/about#priority). This ensures components work correctly with assistive technologies.

**Design System Validation:**

Test visual consistency through CSS class validation, ensuring proper application of design system tokens and responsive behavior.

---

## Hook Testing Guidelines

### Custom Hook Testing Strategy

When building custom hooks for applications using this template, adopt testing patterns that validate business logic while maintaining proper React context integration.

**Hook Testing Approach:**

- **Hook Isolation**: Use `renderHook` for testing hook logic separately
- **Provider Wrapping**: Wrap hooks with necessary React context providers
- **State Validation**: Test hook return values and interface contracts
- **Async Handling**: Test loading states, success scenarios, and error handling
- **TanStack Query**: Test cache management and query state behavior
- **Test Lifecycle**: Clean setup, execution, validation, and cleanup

**Hook Testing Example:**

```typescript
describe('Custom Data Fetching Hook', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  it('should handle successful data fetching', async () => {
    mockRestGet.mockResolvedValue(mockData)

    const { result } = renderHook(() => useCustomHook(id), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
      expect(result.current.isLoading).toBe(false)
    })
  })
})
```

### Hook Testing Best Practices for Teams

**Provider Wrapper Patterns:**

Create reusable wrapper components for hooks that require React context. This ensures hooks execute within proper context boundaries during testing.

**Async State Management:**

For hooks using [TanStack Query](https://tanstack.com/query/latest), test the complete async lifecycle including loading states, success scenarios, error handling, and cache behavior.

**Mock Strategy Integration:**

Mock external dependencies at the service layer rather than individual API calls. This creates predictable test scenarios while validating actual hook behavior.

**Configuration Testing:**

Validate hook configuration such as cache settings, retry logic, and query parameters to ensure hooks behave correctly under different conditions.

---

## Service Testing Approaches

### API Integration Testing Patterns

When building services for applications using this template, implement testing strategies that validate integration points while maintaining proper isolation and predictability.

**Service Testing Strategy:**

- **HTTP/GraphQL Clients**: Test request building and response processing
- **Adapter Mocking**: Mock at adapter level for isolated unit testing
- **Request Validation**: Test URL building and parameter handling
- **Response Processing**: Validate data transformation and type conversion
- **Error Scenarios**: Test failure handling and resilience patterns
- **Integration Points**: Test caching, retry logic, auth, and rate limiting

**Service Testing Example:**

```typescript
describe('HTTP Service Integration', () => {
  let mockAdapter: { request: ReturnType<typeof vi.fn> }

  beforeEach(() => {
    mockAdapter = (
      restClient as unknown as {
        adapter: { request: ReturnType<typeof vi.fn> }
      }
    ).adapter
  })

  it('should handle request formation correctly', async () => {
    const mockResponse = { data: 'test' }
    mockAdapter.request.mockResolvedValue(mockResponse)

    const result = await restClient.request('users', {
      method: 'POST',
      body: { name: 'test' },
      headers: { 'X-Test': 'value' },
      baseUrl: 'https://custom-api.com',
    })

    expect(mockAdapter.request).toHaveBeenCalledWith(
      'https://custom-api.com/users',
      expect.objectContaining({
        method: 'POST',
        body: { name: 'test' },
        headers: { 'X-Test': 'value' },
      }),
    )
    expect(result).toBe(mockResponse)
  })
})
```

### Service Testing Guidelines for Teams

**Adapter Layer Focus:**

Test service behavior by mocking at the adapter level to isolate business logic while validating request formation, parameter handling, and response processing.

**Type Safety Validation:**

Verify TypeScript interfaces and data transformation to ensure services maintain type safety and proper data conversion between external APIs and internal application state.

**Error Handling Patterns:**

Implement error testing covering network failures, API errors, timeout scenarios, and retry logic to validate service resilience.

**Configuration Management:**

Test service configuration including base URLs, headers, timeouts, and retry settings to ensure services behave correctly across different environments.

---

## Mocking Strategy Reference

### Mocking Patterns

The template provides mocking strategies that teams can extend to create predictable test scenarios while maintaining realistic behavior patterns.

**Mocking Strategy Elements:**

- **Service Layer Mocks**: Mock at service interfaces for predictable APIs
- **Data Factory Patterns**: Create consistent test objects with defaults
- **Network Layer Mocking**: HTTP interception for request simulation
- **Browser API Mocks**: Global setup for environment simulation
- **Factory Functions**: Generate customizable test data
- **Interface Mocking**: Maintain type safety and contract compliance
- **Test Scenarios**: Support success, error, edge cases, and loading states

### Data Factory Patterns for Teams

**Factory Function Implementation:**

Create factory functions that provide consistent test objects with reasonable defaults and customizable properties for different test scenarios.

```typescript
// Recommended factory pattern
export const createMockUser = (overrides: Partial<IUser> = {}): IUser => ({
  id: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  preferences: {
    theme: 'light',
    notifications: true,
  },
  ...overrides,
})
```

### Service Mocking Guidelines

**Interface-Based Mocking:**

Implement service mocks that comply with actual service interfaces, ensuring mock behavior matches production service contracts.

```typescript
// Service interface mocking pattern
vi.mock('@/app/services/http', () => ({
  restClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
  graphqlClient: {
    query: vi.fn(),
    mutation: vi.fn(),
  },
}))
```

**Mocking Best Practices for Teams:**

- **Interface Compliance**: Ensure mocks implement actual service interfaces for type safety
- **Predictable Responses**: Design mock responses that support deterministic test scenarios
- **Isolation Focus**: Use service mocks to eliminate external dependencies during testing
- **Performance Optimization**: Leverage mock responses for instant test execution without network delays

---

## Testing Utilities Guide

### Custom Testing Infrastructure

The template provides testing utilities that teams can extend to create efficient and maintainable test suites.

**Testing Utilities Available:**

- **Render Utilities**: Provider wrappers for component testing
- **Custom Matchers**: Domain-specific assertion helpers
- **Mock Factories**: Data generation for consistent test objects
- **Setup Utilities**: Environment configuration helpers
- **Provider Integration**: TanStack Query, Next.js Router, React Context wrappers
- **Testing Enhancements**: Domain matchers, accessibility helpers, API validation

### Render Utility Patterns

**Provider Wrapper Implementation:**

Create reusable render utilities that automatically wrap components with necessary providers, reducing boilerplate and ensuring consistent test environment setup.

```typescript
// Enhanced render utility pattern
export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {},
) => {
  const { initialEntries, queryClient, ...renderOptions } = options
  const Wrapper = createTestWrapper({ initialEntries, queryClient })

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

export const createTestWrapper = (options: {
  initialEntries?: string[]
  queryClient?: QueryClient
} = {}) => {
  const { initialEntries = ['/'], queryClient } = options
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}
```

### Custom Matcher Development

**Domain-Specific Assertions:**

Develop custom matchers that reflect your application's business domain, improving test readability and enabling specialized validation patterns.

```typescript
// Custom matcher example
expect.extend({
  toHaveBeenCalledWithApiPath(received, expectedPath) {
    const calls = received.mock.calls
    const found = calls.some((call) => call[0].includes(expectedPath))

    return {
      pass: found,
      message: () =>
        `expected function to have been called with API path ${expectedPath}`,
    }
  },

  toMatchDataStructure(received, expected) {
    const matches = Object.keys(expected).every(
      (key) => received[key] === expected[key],
    )

    return {
      pass: matches,
      message: () =>
        `expected data to match structure ${JSON.stringify(expected)}`,
    }
  },
})
```

**Utility Development Guidelines:**

- **Domain Relevance**: Create matchers that reflect your application's business concepts
- **Improved Readability**: Design assertions that make tests read more naturally
- **Error Messages**: Provide meaningful error messages for test failures
- **Reusability**: Build shared utilities that eliminate duplication across test files

---

## Quality Standards Implementation

### Coverage Strategy Guidance

The template establishes coverage standards that teams can customize while maintaining quality assurance principles.

**Coverage Standards Implemented:**

- **Provider**: V8 for fast and accurate coverage analysis
- **Thresholds**: 80% minimum across branches, functions, lines, statements
- **Include Patterns**: Target business logic (components, hooks, services, stores, utilities)
- **Exclude Patterns**: Skip config files, generated content, and test files
- **Quality Integration**: Pre-commit gates
- **Reporting**: Text, lcov, and HTML reports for team visibility

**Coverage Configuration Reference:** [`vitest.config.ts`](../vitest.config.ts)

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'lcov', 'html'],
  reportsDirectory: './coverage',

  include: [
    'app/components/**/*.{ts,tsx}',
    'app/hooks/**/*.{ts,tsx}',
    'app/services/**/*.{ts,tsx}',
    'app/stores/**/*.{ts,tsx}',
    'app/utils/**/*.{ts,tsx}',
    'app/views/**/*.{ts,tsx}',
  ],

  exclude: [
    '**/*.const.ts',
    '**/*.{test}.{ts,tsx}',
    '**/*.{type}.ts',
    '**/*.config.{js,ts,mjs}',
    '**/index.ts',
    '**/layout.tsx',
    '**/page.tsx',
  ],

  thresholds: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

### Quality Standards for Teams

**Coverage Threshold Guidelines:**

- **80% Baseline**: Provides quality assurance without excessive testing overhead
- **Business Logic Focus**: Include patterns target functional code while excluding configuration
- **Multiple Metrics**: Measurement across branches, functions, lines, and statements
- **Quality Gates**: Threshold enforcement prevents quality regression during development

---

## Team Workflow Integration

### Development Script Patterns

The template provides testing scripts that teams can extend to support various development workflows and quality requirements.

**Available Testing Scripts:**

- **`test`**: Single run for execution and production validation
- **`test:watch`**: Development loop with auto-rerun on file changes
- **`test:ui`**: Visual interface for interactive debugging and analysis
- **`test:coverage`**: Quality reports for pre-commit validation

**Team Workflow Integration:**

- **Development**: Use watch mode for rapid feedback during feature development
- **Quality Gates**: Run coverage reports before commits
- **Code Reviews**: Include testing considerations in review processes
- **Release Process**: Testing before production deployment

**Script Configuration Reference:** [`package.json`](../package.json)

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "tsc": "tsc"
  }
}
```

### Workflow Integration Guidelines for Teams

**Development Workflow Optimization:**

- **Watch Mode**: Use `test:watch` during active development for immediate feedback
- **UI Mode**: Leverage `test:ui` for visual test debugging and analysis
- **Coverage Reports**: Run `test:coverage` before commits to validate quality standards
- **CI Integration**: Use `test` for automated pipeline execution and deployment gates

**Team Collaboration Patterns:**

- **Consistent Standards**: Shared testing patterns across team members
- **Quality Gates**: Automated enforcement of testing requirements
- **Review Integration**: Testing considerations in code review processes
- **Documentation**: Test examples and patterns serve as team reference

---

## Implementation Guidance for Teams

### Getting Started with Testing

When beginning a new project with this template, teams should establish testing practices early in the development process to maximize long-term benefits.

**Initial Setup Checklist:**

1. **Environment Configuration**: Verify Vitest configuration meets project requirements
2. **Global Setup**: Customize `vitest.setup.ts` for project-specific needs
3. **Coverage Targets**: Adjust coverage thresholds based on team standards
4. **Mock Strategies**: Establish mocking patterns for external dependencies
5. **Utility Development**: Create project-specific testing utilities and helpers

**Development Process Integration:**

- **Feature Development**: Write tests alongside feature implementation
- **Code Reviews**: Include testing considerations in review criteria
- **Team Training**: Ensure all team members understand testing patterns and tools

### Scaling Testing Practices

As applications grow in complexity, teams should evolve their testing practices to maintain quality and development velocity.

**Scaling Considerations:**

- **Test Organization**: Organize tests to reflect application architecture
- **Performance Optimization**: Monitor and optimize test execution time
- **Maintenance Strategies**: Regular review and refactoring of test suites
- **Documentation Updates**: Keep testing documentation current with application changes

---

## References

| Resource                                                                                            | Description                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Vitest](https://vitest.dev/)                                                                       | Fast testing framework with native TypeScript support |
| [Vitest Guide](https://vitest.dev/guide/)                                                           | Guide to Vitest configuration and usage               |
| [React Testing Library](https://testing-library.com/)                                               | User-centric testing utilities for React applications |
| [React Testing Library Introduction](https://testing-library.com/docs/react-testing-library/intro/) | Getting started with React Testing Library            |
| [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)           | Core principles for effective testing practices       |
| [Testing Library Query Priority](https://testing-library.com/docs/queries/about#priority)           | Best practices for selecting DOM elements in tests    |
| [TanStack Query](https://tanstack.com/query/latest)                                                 | Data fetching and caching library for React           |
| [Zustand](https://zustand-demo.pmnd.rs/)                                                            | Lightweight state management library                  |
| [Next.js Testing with Vitest](https://nextjs.org/docs/app/building-your-application/testing/vitest) | Official Next.js testing setup guide                  |
