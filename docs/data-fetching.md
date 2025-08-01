# Data Fetching

Patterns for API integration and server state management that balance developer experience with application performance.

## Table of Contents

- [HTTP Service Architecture](#http-service-architecture)
- [Adapter Pattern Implementation](#adapter-pattern-implementation)
- [Client Configuration](#client-configuration)
- [React Query Integration](#react-query-integration)
- [Error Handling Strategies](#error-handling-strategies)
- [Performance Considerations](#performance-considerations)
- [Real-World Examples](#real-world-examples)
- [Testing Data Fetching](#testing-data-fetching)
- [Extending the System](#extending-the-system)

## Related Documentation

- [Architecture](./architecture.md) - Service layer architecture and coordinator patterns
- [Caching](./caching.md) - Cache integration and performance optimization strategies
- [State Management](./state-management.md) - Server state management with TanStack Query
- **[Authentication](./authentication.md)** - Secure API requests and authentication integration
- [Testing](./testing.md) - Service testing patterns and HTTP client validation
- [Examples](./examples.md) - Practical data fetching implementation examples

## HTTP Service Architecture

The template organizes data fetching around a layered architecture that separates concerns between transport protocols, caching strategies, and state management. This design enables teams to work with different APIs while maintaining consistent patterns across the application.

## HTTP Service Architecture Stack

**Application Layer**

- React Query Hooks ← Components

**Service Layer**

- REST Client, GraphQL Client

**Adapter Layer**

- Fetch REST Adapter, Fetch GraphQL Adapter

**Transport Layer**

- Fetch API → HTTP/HTTPS

**Data Flow:** Components → React Query → REST/GraphQL Clients → Fetch Adapters → Fetch API → Network

**Benefits:** Clear separation of concerns, consistent interfaces, flexible implementation swapping

This layered approach provides clear separation of concerns. Components work through React Query hooks to access data, while the service layer manages protocol-specific concerns. The adapter layer enables flexibility in HTTP implementations, and the transport layer handles the actual network communication.

### Core Design Principles

The HTTP service follows several design principles that teams should understand when extending or modifying the data fetching layer:

**Interface Standardization**: Both REST and GraphQL clients implement consistent interfaces, allowing teams to switch between protocols without changing application logic. The `IRestHttpAdapter` and `IGraphQLHttpAdapter` interfaces define contracts that any implementation must follow.

**Dependency Injection**: The template uses factory functions in `HTTP_ADAPTER_CONFIG` to inject adapters at runtime. This pattern enables testing with mock adapters and production flexibility without tight coupling to specific implementations.

**Error Consistency**: All adapters handle errors through the same error processing pipeline, ensuring uniform error handling regardless of the underlying HTTP library or protocol.

**Caching Integration**: The adapter interfaces include [Next.js-specific caching options](https://nextjs.org/docs/app/building-your-application/caching) (`revalidate`, `tags`) that integrate seamlessly with the framework's caching layer while remaining abstracted from business logic.

## Adapter Pattern Implementation

The template implements the adapter pattern to provide a stable interface for HTTP communication while allowing flexibility in the underlying implementation. This pattern enables teams to swap HTTP libraries, add authentication layers, or integrate specialized functionality without disrupting existing code.

```mermaid
classDiagram
    class IRestHttpAdapter {
        +request(url, config) Promise~TResponse~
        +name string
    }

    class IGraphQLHttpAdapter {
        +request(endpoint, query, config) Promise~IGraphQLResponse~
        +name string
    }

    class FetchRestAdapter {
        +request(url, config) Promise~TResponse~
        +name "fetch-rest"
        -combineSignals(signals) AbortSignal
    }

    class FetchGraphQLAdapter {
        +request(endpoint, query, config) Promise~IGraphQLResponse~
        +name "fetch-graphql"
        -combineSignals(signals) AbortSignal
    }

    class RestClient {
        -adapter IRestHttpAdapter
        +get(url, options) Promise~TResponse~
        +post(url, options) Promise~TResponse~
        +put(url, options) Promise~TResponse~
        +delete(url, options) Promise~TResponse~
    }

    class GraphQLClient {
        -adapter IGraphQLHttpAdapter
        +query(query, variables, options) Promise~IGraphQLResponse~
        +mutation(mutation, variables, options) Promise~IGraphQLResponse~
        +subscription(subscription, variables, options) Promise~IGraphQLResponse~
    }

    IRestHttpAdapter <|.. FetchRestAdapter
    IGraphQLHttpAdapter <|.. FetchGraphQLAdapter
    RestClient --> IRestHttpAdapter
    GraphQLClient --> IGraphQLHttpAdapter
```

### Interface Definition

The adapter interfaces define the contract that any HTTP implementation must follow. Located in `@/services/http/core/core.type.ts`, these interfaces ensure consistency across different implementations:

```typescript
export interface IRestHttpAdapter {
  request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse>
  readonly name: string
}

export interface IGraphQLHttpAdapter {
  request<TResponse>(
    endpoint: string,
    query: string,
    config: IGraphQLRequestConfig,
  ): Promise<IGraphQLResponse<TResponse>>
  readonly name: string
}
```

### Default Fetch Implementation

The template includes fetch-based adapters that handle the most common use cases. The `FetchRestAdapter` in `@/services/http/rest/adapters/fetch-rest.ts` demonstrates the standard implementation pattern:

```typescript
export class FetchRestAdapter implements IRestHttpAdapter {
  readonly name = 'fetch-rest'

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const {
      method,
      body,
      headers,
      timeout,
      tags = [],
      revalidate,
      signal: externalSignal,
      ...restOptions
    } = config

    const finalHeaders = createHeaders(headers)
    const timeoutSignal = createTimeoutSignal(timeout)
    const signal = this.combineSignals(externalSignal, timeoutSignal)

    const requestInit: RequestInit = {
      method,
      headers: finalHeaders,
      signal,
      ...restOptions,
    }

    if (body && method !== 'GET' && method !== 'DELETE') {
      requestInit.body = JSON.stringify(body)
    }

    // Next.js caching integration
    if (tags.length > 0 || revalidate !== undefined) {
      requestInit.next = { tags, revalidate }
    }

    const response = await fetch(url, requestInit)
    return processResponse<TResponse>(response)
  }
}
```

This implementation handles signal combination for timeout and cancellation, integrates with [Next.js caching](https://nextjs.org/docs/app/building-your-application/caching), and processes responses through the standard error handling pipeline.

### Configuration and Factory Pattern

The `HTTP_ADAPTER_CONFIG` in `@/services/http/core/core.ts` uses factory functions to configure adapters:

```typescript
export const HTTP_ADAPTER_CONFIG: {
  restAdapter: TRestAdapterFactory
  graphqlAdapter: TGraphQLAdapterFactory
} = {
  restAdapter: () => new FetchRestAdapter(),
  graphqlAdapter: () => new FetchGraphQLAdapter(),
}
```

Teams can modify this configuration to use different adapters without changing client code. For example, to use an axios-based adapter:

```typescript
export const HTTP_ADAPTER_CONFIG = {
  restAdapter: () => new AxiosRestAdapter(),
  graphqlAdapter: () => new FetchGraphQLAdapter(),
}
```

## Client Configuration

The template provides two singleton clients that handle protocol-specific concerns while maintaining consistent interfaces for application code.

### REST Client

The `RestClient` class in `@/services/http/rest/rest.ts` provides methods for common HTTP operations:

```typescript
class RestClient {
  private adapter: IRestHttpAdapter

  constructor() {
    const adapterFactory = HTTP_ADAPTER_CONFIG.restAdapter
    this.adapter = adapterFactory()
  }

  async get<TResponse>(
    path: string,
    options: IRestRequestOptions = {},
  ): Promise<TResponse> {
    const { baseUrl, ...restOptions } = options
    const finalBaseUrl = resolveBaseUrl(baseUrl)
    const url = buildUrl(finalBaseUrl, path)

    return this.adapter.request<TResponse>(url, {
      method: 'GET',
      ...restOptions,
    })
  }

  async post<TResponse>(
    path: string,
    options: IRestRequestOptions = {},
  ): Promise<TResponse> {
    // Implementation follows same pattern
  }
}

export const restClient = new RestClient()
```

Teams access the REST client as a singleton instance, ensuring consistent configuration across the application. A typical query demonstrates standard usage:

```typescript
const getEntityData = async (id: string) => {
  try {
    const response = await restClient.get<IEntityDetail>(`/entities/${id}`, {
      baseUrl: process.env.API_BASE_URL,
      revalidate: 3600, // 1 hour cache
    })

    return {
      success: true,
      data: response,
      error: null,
    }
  } catch (error) {
    console.error(`Error fetching entity ${id}:`, error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

### GraphQL Client

The `GraphQLClient` provides query, mutation, and subscription methods with consistent error handling:

```typescript
class GraphQLClient {
  private adapter: IGraphQLHttpAdapter

  async query<TResponse, TVariables = Record<string, unknown>>(
    query: string,
    variables?: TVariables,
    options?: Omit<IGraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(query, { ...options, variables })
  }

  async mutation<TResponse, TVariables = Record<string, unknown>>(
    mutation: string,
    variables?: TVariables,
    options?: Omit<IGraphQLRequestOptions<TVariables>, 'variables'>,
  ) {
    return this.request<TResponse, TVariables>(mutation, {
      ...options,
      variables,
    })
  }
}

export const graphqlClient = new GraphQLClient()
```

A typical GraphQL query shows standard usage patterns:

```typescript
const getEntitiesData = async (limit: number = 8, offset: number = 0) => {
  try {
    const response = await graphqlClient.query<IEntitiesResponse>(
      GET_ENTITIES_QUERY,
      {
        limit,
        offset,
      },
      {
        baseUrl: process.env.GRAPHQL_ENDPOINT,
        revalidate: 300, // 5 minutes cache
      },
    )

    return {
      success: true,
      data: response.data?.entities?.results || [],
      count: response.data?.entities?.count || 0,
      next: response.data?.entities?.next || null,
      previous: response.data?.entities?.previous || null,
    }
  } catch (error) {
    console.error('Error fetching entities:', error)
    return {
      success: false,
      data: [],
      count: 0,
      next: null,
      previous: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

## React Query Integration

The template integrates [TanStack Query](https://tanstack.com/query/latest) for server state management, providing caching, background updates, and optimistic updates. The `HttpProvider` in `@/services/http/providers/react-query.tsx` configures the QueryClient with opinionated defaults that prioritize development experience:

```typescript
export const HttpProvider = ({ children }: HttpProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: HTTP_CONFIG.DEFAULT_STALE_TIME, // 5 minutes
          retry: HTTP_CONFIG.DEFAULT_RETRY_COUNT,    // 1 retry
          refetchOnWindowFocus: false,
          refetchOnReconnect: 'always',
        },
        mutations: {
          retry: false,
        },
      },
    })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

### Hook Implementation Patterns

The template establishes consistent patterns for implementing data fetching hooks. A standard hook structure follows this pattern:

```typescript
const useEntityDataGraphQL = (
  entityId: string,
  options?: TUseEntityDataGraphQLOptions,
): TUseEntityDataGraphQLReturn => {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: [ENTITY_DATA_GRAPHQL_QUERY_KEY, entityId],
    queryFn: () => fetchEntityDataGraphQL(entityId),
    staleTime:
      ENTITY_DATA_GRAPHQL_CONFIG.ENTITY_DATA_GRAPHQL_CACHE_MINUTES * 60 * 1000,
    gcTime:
      ENTITY_DATA_GRAPHQL_CONFIG.ENTITY_DATA_GRAPHQL_GC_MINUTES * 60 * 1000,
    retry: ENTITY_DATA_GRAPHQL_CONFIG.RETRY_COUNT,
    enabled: options?.enabled,
  })

  return {
    entityData: data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  }
}
```

### Infinite Queries

For paginated data, the template uses [infinite queries](https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries). A typical implementation follows this pattern:

```typescript
export const useMoreEntities = ({
  initialOffset = 8,
}: TUseMoreEntitiesOptions = {}) => {
  return useInfiniteQuery({
    queryKey: ENTITIES_QUERY_CONFIG.QUERY_KEY,
    queryFn: async ({ pageParam = initialOffset }) => {
      const response = await graphqlClient.query<IEntitiesResponse>(
        GET_ENTITIES_QUERY,
        {
          limit: ENTITIES_PER_PAGE,
          offset: pageParam,
        },
        {
          baseUrl: process.env.GRAPHQL_ENDPOINT,
        },
      )

      return {
        data: response.data?.entities?.results || [],
        count: response.data?.entities?.count || 0,
        next: response.data?.entities?.next || null,
        previous: response.data?.entities?.previous || null,
        nextOffset: pageParam + ENTITIES_PER_PAGE,
      }
    },
    initialPageParam: initialOffset,
    getNextPageParam: (lastPage) => {
      const totalLoaded = lastPage.nextOffset
      const totalCount = lastPage.count

      return totalLoaded < totalCount ? lastPage.nextOffset : undefined
    },
    staleTime: ENTITIES_QUERY_CONFIG.STALE_TIME,
    enabled: false,
  })
}
```

## Error Handling Strategies

The template uses a multi-layered error handling approach that provides consistent error experiences across different failure scenarios.

```mermaid
graph TB
    subgraph "Error Handling Flow"
        NE[Network Error] --> AE[Adapter Error Processing]
        SE[Server Error] --> AE
        PE[Parse Error] --> AE

        AE --> EH[Error Handler]
        EH --> EB[Error Boundary]
        EH --> CE[Component Error State]
        EH --> RQ[React Query Error]

        EB --> FU[Fallback UI]
        CE --> EI[Error Indicator]
        RQ --> RS[Retry Strategy]
    end

    style NE fill:#ffebee
    style SE fill:#ffebee
    style PE fill:#ffebee
    style EH fill:#fff3e0
    style EB fill:#e8f5e8
    style CE fill:#e8f5e8
```

### Adapter Level Error Handling

The `processResponse` utility in `@/services/http/core/core.utils.ts` handles HTTP errors consistently across all adapters:

```typescript
export const processResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: IHttpError = {
      message: response.statusText || 'Request failed',
      status: response.status,
    }

    try {
      const errorBody = await response.json()
      error.details = errorBody
      if (errorBody.message) {
        error.message = errorBody.message
      }
      if (errorBody.code) {
        error.code = errorBody.code
      }
    } catch {}

    throw error
  }

  try {
    return await response.json()
  } catch {
    return {} as T
  }
}
```

### Component Error Handling

Components handle errors through standardized patterns that provide user feedback while maintaining functionality:

```typescript
const EntityDataComponent = ({ entityId }: IEntityDataComponentProps) => {
  const { entityData, isError, error, isFetching } = useEntityDataGraphQL(
    entityId,
    { enabled: true },
  )

  if (isFetching) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Entity Data</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ✨ GraphQL Client-side
          </div>
        </div>
        <Spinner text='Loading data via GraphQL...' />
      </div>
    )
  }

  if (isError || !entityData) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-6 shadow-lg'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-black'>Entity Data</h2>
          <div className='rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs text-gray-700'>
            ❌ GraphQL Error
          </div>
        </div>
        <div className='rounded-lg border border-gray-300 bg-gray-50 p-6 text-center'>
          <p className='text-gray-600'>
            {error?.message || ERROR_MESSAGES.ENTITY_DATA_GRAPHQL_FAILED}
          </p>
        </div>
      </div>
    )
  }

  // Render success state
}
```

This pattern ensures that errors are handled gracefully without breaking the overall user interface.

## Performance Considerations

The template provides strategies for optimizing data fetching performance beyond caching (detailed caching strategies are covered in the [Caching documentation](./caching.md)).

### Request Optimization

Minimize network overhead through intelligent request patterns:

```typescript
// Request deduplication (automatic with React Query)
const EntityDisplay: React.FC = () => {
  // Both requests for the same data are automatically deduped
  const entity1 = useEntityDetails(25)
  const entity2 = useEntityDetails(25) // No additional network request

  return <EntityCards entity1={entity1.data} entity2={entity2.data} />
}

// Request batching for related data
const useEntityWithRelatedData = (entityId: string) => {
  const entityDetail = useEntityDetail(entityId)
  const entityMetadata = useEntityMetadataGraphQL(entityId, {
    enabled: !!entityDetail.data?.id
  })

  return {
    entity: entityDetail.data,
    metadata: entityMetadata.entityMetadata,
    isLoading: entityDetail.isLoading || entityMetadata.isLoading,
  }
}
```

## Real-World Examples

The template includes examples that demonstrate data fetching patterns in realistic scenarios.

### Entity Detail with Related Information

Entity detail pages can combine REST and GraphQL queries to display detailed information. A dependent query pattern shows how to implement related data fetching:

```typescript
const useEntityDetails = (
  entityId: number | undefined,
  options: TUseEntityDetailsOptions = {},
): TUseEntityDetailsReturn => {
  const { enabled = true } = options

  const {
    data: details,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [ENTITY_DETAILS_QUERY_KEY, entityId],
    queryFn: () => fetchEntityDetails(entityId!),
    enabled: enabled && !!entityId, // Only fetch when ID is available
    staleTime: 1000 * 60 * ENTITY_DETAILS_CONFIG.DETAILS_CACHE_MINUTES,
    gcTime: 1000 * 60 * ENTITY_DETAILS_CONFIG.DETAILS_GC_MINUTES,
    retry: ENTITY_DETAILS_CONFIG.RETRY_COUNT,
  })

  return {
    details,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  }
}
```

### CMS Integration

CMS integrations demonstrate authenticated GraphQL queries:

```typescript
const getCmsData = async () => {
  try {
    const response = await graphqlClient.query<ICmsResponse>(
      GET_CMS_QUERY,
      {},
      {
        baseUrl: process.env.CMS_GRAPHQL_ENDPOINT,
        revalidate: 300, // 5 minutes
        headers: {
          Authorization: `Bearer ${process.env.CMS_API_TOKEN}`,
        },
      },
    )

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    console.error('Error fetching CMS data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
```

## Testing Data Fetching

The template includes testing utilities and patterns for reliable data fetching tests that don't depend on external services.

### Mock Strategy

Testing focuses on behavior rather than implementation details. Mock the HTTP clients rather than individual fetch calls:

```typescript
// Mock the entire HTTP client
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
    subscription: vi.fn(),
  },
}))

// Test hook behavior
describe('useEntityDetails', () => {
  it('should handle successful data fetch', async () => {
    const mockData = {
      id: 25,
      name: 'test-entity',
      description: 'A test entity for demonstration',
      metadata: { created_at: '2024-01-01', updated_at: '2024-01-01' },
    }

    restClient.get.mockResolvedValue(mockData)

    const { result } = renderHook(() => useEntityDetails(25), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.details).toEqual(mockData)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
    })
  })

  it('should handle error states', async () => {
    const errorMessage = 'Network error'
    restClient.get.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useEntityDetails(25), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
      expect(result.current.error?.message).toBe(errorMessage)
    })
  })
})
```

### Test Utilities

Create utilities for common testing scenarios:

```typescript
// Query wrapper for React Query tests
export const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// Mock data factories
export const createMockEntity = (overrides: Partial<IEntityDetail> = {}): IEntityDetail => ({
  id: 25,
  name: 'test-entity',
  description: 'A test entity for demonstration',
  metadata: {
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  },
  status: 'active',
  tags: [],
  properties: {},
  ...overrides,
})
```

## Extending the System

Teams can extend the data fetching system in several ways without breaking existing functionality.

### Custom Adapters

Create adapters for specialized requirements:

```typescript
// Example: Adapter with automatic retry logic
export class RetryRestAdapter implements IRestHttpAdapter {
  readonly name = 'retry-rest'
  private maxRetries = 3
  private retryDelay = 1000

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    let lastError: Error

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        return await this.executeRequest<TResponse>(url, config)
      } catch (error) {
        lastError = error as Error

        if (attempt < this.maxRetries && this.shouldRetry(error)) {
          await this.delay(this.retryDelay * Math.pow(2, attempt))
          continue
        }

        throw error
      }
    }

    throw lastError!
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors or 5xx status codes
    return !error.status || error.status >= 500
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
```

### Authentication Integration

Add authentication to HTTP requests:

```typescript
export class AuthenticatedAdapter implements IRestHttpAdapter {
  readonly name = 'authenticated-rest'

  constructor(private tokenProvider: () => Promise<string>) {}

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const token = await this.tokenProvider()

    const authHeaders = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    }

    return fetch(url, {
      ...config,
      headers: authHeaders,
    }).then(processResponse)
  }
}
```

### Monitoring and Analytics

Integrate request monitoring:

```typescript
export class MonitoredAdapter implements IRestHttpAdapter {
  readonly name = 'monitored-rest'

  constructor(
    private baseAdapter: IRestHttpAdapter,
    private analytics: AnalyticsService,
  ) {}

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const startTime = Date.now()

    try {
      const result = await this.baseAdapter.request<TResponse>(url, config)

      this.analytics.track('http_request_success', {
        url,
        method: config.method,
        duration: Date.now() - startTime,
      })

      return result
    } catch (error) {
      this.analytics.track('http_request_error', {
        url,
        method: config.method,
        error: error.message,
        duration: Date.now() - startTime,
      })

      throw error
    }
  }
}
```

The adapter pattern makes these extensions straightforward to implement and test without affecting existing functionality. Teams can compose multiple adapters or switch implementations based on environment or feature flags.

---

## References

| Resource                                                                                                       | Description                                   |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [TanStack Query](https://tanstack.com/query/latest)                                                            | Data synchronization library for React        |
| [TanStack Query React Guide](https://tanstack.com/query/latest/docs/framework/react/overview)                  | Complete React integration and setup guide    |
| [TanStack Query Caching](https://tanstack.com/query/latest/docs/framework/react/guides/caching)                | Caching strategies and configuration          |
| [TanStack Query Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)            | Data mutation patterns and optimistic updates |
| [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)                   | Server-side data fetching with App Router     |
| [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) | Server component patterns and best practices  |
| [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)                                               | Minimal GraphQL client for JavaScript         |
| [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                          | Native browser API for HTTP requests          |
