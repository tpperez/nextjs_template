# Testing Framework

Testing framework configuration and patterns for comprehensive test coverage and reliable code quality assurance.

## vitest configuration

### test environment setup

vitest provides fast testing with typescript support and react integration:

```typescript
// vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/*.test.{ts,tsx}',
        '**/test/**',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './app'),
    },
  },
})
```

### test setup configuration

global test setup provides consistent testing environment:

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { beforeAll, afterAll, afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// msw server setup
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// cleanup dom after each test
afterEach(() => {
  cleanup()
})

// global mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// intersection observer mock
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

// resize observer mock
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
```

## component testing patterns

### react component testing

comprehensive component testing with react testing library:

```typescript
// spinner.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Spinner from './spinner'
import { ISpinnerProps } from './spinner.type'

describe('Spinner Component', () => {
  const defaultProps: ISpinnerProps = {
    size: 'md',
    color: 'blue'
  }

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<Spinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('h-6', 'w-6', 'border-blue-400')
    })

    it('should apply size classes correctly', () => {
      render(<Spinner size="lg" />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-8', 'w-8')
    })

    it('should apply color classes correctly', () => {
      render(<Spinner color="green" />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-green-400')
    })

    it('should display text when provided', () => {
      const text = 'loading data...'
      render(<Spinner text={text} />)

      expect(screen.getByText(text)).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      const customClass = 'custom-spinner'
      render(<Spinner className={customClass} />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass(customClass)
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      render(<Spinner />)

      const spinner = screen.getByRole('status')
      expect(spinner).toHaveAttribute('aria-label', 'loading')
    })

    it('should be hidden from screen readers when decorative', () => {
      render(<Spinner decorative />)

      const spinner = screen.getByTestId('spinner')
      expect(spinner).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
```

### hook testing patterns

custom hook testing with react hooks testing library:

```typescript
// pokemon-species.hook.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePokemonSpecies } from './pokemon-species.hook'
import { createMockPokemonSpecies } from '@/test/mocks/pokemon'
import * as restClient from '@/services/http/rest'

// mock rest client
vi.mock('@/services/http/rest')
const mockRestGet = vi.mocked(restClient.get)

describe('usePokemonSpecies Hook', () => {
  let queryClient: QueryClient
  let wrapper: React.FC<{ children: React.ReactNode }>

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })

    wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  })

  afterEach(() => {
    queryClient.clear()
    vi.clearAllMocks()
  })

  describe('Data Fetching', () => {
    it('should fetch pokemon species successfully', async () => {
      const mockSpecies = createMockPokemonSpecies({ id: 25, name: 'pikachu' })
      mockRestGet.mockResolvedValue(mockSpecies)

      const { result } = renderHook(() => usePokemonSpecies(25), { wrapper })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.data).toBeUndefined()

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(result.current.data).toEqual(mockSpecies)
      expect(mockRestGet).toHaveBeenCalledWith('/pokemon-species/25', {
        baseUrl: 'https://pokeapi.co/api/v2'
      })
    })

    it('should handle loading states correctly', () => {
      mockRestGet.mockImplementation(() => new Promise(() => {})) // never resolves

      const { result } = renderHook(() => usePokemonSpecies(25), { wrapper })

      expect(result.current.isLoading).toBe(true)
      expect(result.current.isError).toBe(false)
      expect(result.current.isFetching).toBe(true)
    })

    it('should not fetch when id is falsy', () => {
      const { result } = renderHook(() => usePokemonSpecies(0), { wrapper })

      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(mockRestGet).not.toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle api errors gracefully', async () => {
      const error = new Error('pokemon not found')
      mockRestGet.mockRejectedValue(error)

      const { result } = renderHook(() => usePokemonSpecies(999), { wrapper })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(result.current.error).toEqual(error)
      expect(result.current.data).toBeUndefined()
    })

    it('should retry failed requests appropriately', async () => {
      mockRestGet
        .mockRejectedValueOnce(new Error('network error'))
        .mockRejectedValueOnce(new Error('network error'))
        .mockResolvedValue(createMockPokemonSpecies())

      const { result } = renderHook(() => usePokemonSpecies(25), { wrapper })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      // should have retried 2 times (initial + 2 retries)
      expect(mockRestGet).toHaveBeenCalledTimes(3)
    })
  })

  describe('Query Configuration', () => {
    it('should use correct query key', () => {
      renderHook(() => usePokemonSpecies(25), { wrapper })

      const queries = queryClient.getQueryCache().getAll()
      const speciesQuery = queries.find(q =>
        JSON.stringify(q.queryKey) === JSON.stringify(['pokemon-species', 25])
      )

      expect(speciesQuery).toBeDefined()
    })

    it('should respect cache configuration', async () => {
      const mockSpecies = createMockPokemonSpecies()
      mockRestGet.mockResolvedValue(mockSpecies)

      const { result, rerender } = renderHook(
        ({ id }) => usePokemonSpecies(id),
        { wrapper, initialProps: { id: 25 } }
      )

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      // should use cached data for same id
      mockRestGet.mockClear()
      rerender({ id: 25 })

      expect(mockRestGet).not.toHaveBeenCalled()
      expect(result.current.data).toEqual(mockSpecies)
    })
  })
})
```

## integration testing

### component integration testing

test component integration with external dependencies:

```typescript
// tech-radar.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import TechRadar from './tech-radar'
import { TECH_RADAR_CONFIG } from './tech-radar.const'

// mock external dependencies
vi.mock('next/script', () => ({
  default: vi.fn(({ children, onLoad, ...props }) => {
    // simulate script loading
    setTimeout(() => onLoad?.(), 100)
    return <script {...props}>{children}</script>
  })
}))

const mockRadarVisualization = vi.fn()
const mockD3 = {
  select: vi.fn(() => ({
    selectAll: vi.fn(() => ({
      remove: vi.fn()
    }))
  }))
}

describe('TechRadar Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    // setup global dependencies
    Object.defineProperty(window, 'radar_visualization', {
      value: mockRadarVisualization,
      writable: true
    })

    Object.defineProperty(window, 'd3', {
      value: mockD3,
      writable: true
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('should initialize radar visualization after scripts load', async () => {
    render(<TechRadar />)

    // advance timers to simulate script loading
    vi.advanceTimersByTime(100)

    await waitFor(() => {
      expect(mockRadarVisualization).toHaveBeenCalledWith(TECH_RADAR_CONFIG)
    })
  })

  it('should handle script loading failures gracefully', async () => {
    // simulate missing dependencies
    delete window.radar_visualization
    delete window.d3

    render(<TechRadar />)

    vi.advanceTimersByTime(200)

    // should not throw errors
    expect(() => {
      vi.advanceTimersByTime(100)
    }).not.toThrow()
  })

  it('should cleanup on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')

    const { unmount } = render(<TechRadar />)
    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })
})
```

### api integration testing

test api integration with mock service worker:

```typescript
// pokemon.integration.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { rest } from 'msw'
import { server } from '@/test/mocks/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PokemonList from './pokemon-list'

describe('Pokemon API Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should load and display pokemon list', async () => {
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
        return res(ctx.json({
          results: [
            { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { id: 25, name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }
          ]
        }))
      })
    )

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    )

    // should show loading initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // should display pokemon after loading
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument()
      expect(screen.getByText('pikachu')).toBeInTheDocument()
    })
  })

  it('should handle api errors gracefully', async () => {
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'server error' }))
      })
    )

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/error loading pokemon/i)).toBeInTheDocument()
    })

    // should have retry button
    const retryButton = screen.getByText(/try again/i)
    expect(retryButton).toBeInTheDocument()
  })

  it('should retry failed requests', async () => {
    let callCount = 0
    server.use(
      rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
        callCount++
        if (callCount === 1) {
          return res(ctx.status(500))
        }
        return res(ctx.json({ results: [] }))
      })
    )

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    )

    // wait for error state
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })

    // click retry
    fireEvent.click(screen.getByText(/try again/i))

    // should succeed on retry
    await waitFor(() => {
      expect(screen.getByText(/no pokemon found/i)).toBeInTheDocument()
    })

    expect(callCount).toBe(2)
  })
})
```

## mock strategies

### service mocking

comprehensive service layer mocking:

```typescript
// test/mocks/services.ts
import { vi } from 'vitest'
import type {
  IRestHttpAdapter,
  IGraphQLHttpAdapter,
} from '@/services/http/core/core.type'

export const createMockRestClient = (): jest.Mocked<IRestHttpAdapter> => ({
  name: 'mock-rest-client',
  request: vi.fn(),
})

export const createMockGraphQLClient =
  (): jest.Mocked<IGraphQLHttpAdapter> => ({
    name: 'mock-graphql-client',
    request: vi.fn(),
  })

// service-specific mocks
export const mockPokemonService = {
  fetchPokemonSpecies: vi.fn(),
  fetchPokemonList: vi.fn(),
  searchPokemon: vi.fn(),
}

export const mockAuthService = {
  login: vi.fn(),
  logout: vi.fn(),
  refreshToken: vi.fn(),
  getCurrentUser: vi.fn(),
  validateToken: vi.fn(),
}
```

### data mocking utilities

factory functions for test data generation:

```typescript
// test/mocks/pokemon.ts
import type { IPokemonSpecies, IPokemon } from '@/types/pokemon'

export const createMockPokemonSpecies = (
  overrides: Partial<IPokemonSpecies> = {},
): IPokemonSpecies => ({
  id: 25,
  name: 'pikachu',
  evolutionChain: 'pichu-pikachu-raichu',
  habitat: 'forest',
  flavorText:
    'when several of these pokemon gather, their electricity could build and cause lightning storms.',
  ...overrides,
})

export const createMockPokemon = (
  overrides: Partial<IPokemon> = {},
): IPokemon => ({
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: ['electric'],
  abilities: ['static', 'lightning-rod'],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  ...overrides,
})

export const createMockPokemonList = (count: number = 5): IPokemon[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockPokemon({
      id: index + 1,
      name: `pokemon-${index + 1}`,
    }),
  )
}
```

### msw server configuration

mock service worker for api mocking:

```typescript
// test/mocks/handlers.ts
import { rest } from 'msw'
import { createMockPokemonSpecies, createMockPokemonList } from './pokemon'

export const handlers = [
  // pokemon species endpoint
  rest.get('https://pokeapi.co/api/v2/pokemon-species/:id', (req, res, ctx) => {
    const { id } = req.params
    const pokemonId = parseInt(id as string)

    if (pokemonId === 999) {
      return res(ctx.status(404), ctx.json({ message: 'pokemon not found' }))
    }

    return res(ctx.json(createMockPokemonSpecies({ id: pokemonId })))
  }),

  // pokemon list endpoint
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    const limit = req.url.searchParams.get('limit') || '20'
    const offset = req.url.searchParams.get('offset') || '0'

    const pokemonList = createMockPokemonList(parseInt(limit))

    return res(
      ctx.json({
        count: 1000,
        next: `https://pokeapi.co/api/v2/pokemon?offset=${parseInt(offset) + parseInt(limit)}&limit=${limit}`,
        previous: null,
        results: pokemonList,
      }),
    )
  }),

  // error simulation endpoint
  rest.get('https://api.example.com/error', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ message: 'internal server error' }))
  }),
]

// test/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

## testing utilities

### custom render utilities

enhanced render functions with providers:

```typescript
// test/utils/render.tsx
import { render, RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { ReactElement, ReactNode } from 'react'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[]
  queryClient?: QueryClient
}

export const createQueryWrapper = (queryClient?: QueryClient) => {
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export const createRouterWrapper = (initialEntries: string[] = ['/']) => {
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={initialEntries}>
      {children}
    </MemoryRouter>
  )
}

export const createTestWrapper = (options: {
  initialEntries?: string[]
  queryClient?: QueryClient
} = {}) => {
  const { initialEntries = ['/'], queryClient } = options
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { initialEntries, queryClient, ...renderOptions } = options
  const Wrapper = createTestWrapper({ initialEntries, queryClient })

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
```

### assertion utilities

custom matchers and assertion helpers:

```typescript
// test/utils/assertions.ts
import { expect } from 'vitest'

// custom matchers
interface CustomMatchers<R = unknown> {
  toHaveBeenCalledWithPokemonId(id: number): R
  toMatchPokemonSpecies(expected: Partial<IPokemonSpecies>): R
}

declare global {
  namespace Vi {
    interface Assertion<T = any> extends CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}

// custom matcher implementations
expect.extend({
  toHaveBeenCalledWithPokemonId(received, expectedId) {
    const calls = received.mock.calls
    const found = calls.some((call) =>
      call[0].includes(`/pokemon-species/${expectedId}`),
    )

    return {
      pass: found,
      message: () =>
        `expected function to have been called with pokemon id ${expectedId}`,
    }
  },

  toMatchPokemonSpecies(received, expected) {
    const matches = Object.keys(expected).every(
      (key) => received[key] === expected[key],
    )

    return {
      pass: matches,
      message: () =>
        `expected pokemon species to match ${JSON.stringify(expected)}`,
    }
  },
})

// assertion helpers
export const expectPokemonSpecies = (species: IPokemonSpecies) => ({
  toHaveValidId: () => expect(species.id).toBeGreaterThan(0),
  toHaveValidName: () => expect(species.name).toBeTruthy(),
  toHaveEvolutionChain: () => expect(species.evolutionChain).toBeTruthy(),
})
```

## test scripts and automation

### npm scripts configuration

testing scripts in package.json:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:integration": "vitest run --config vitest.integration.config.ts",
    "test:e2e": "playwright test"
  }
}
```

### continuous integration

testing in ci/cd pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run tsc
      - run: npm run test:coverage

      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```
