# Data Fetching

API integration patterns and data retrieval strategies for efficient and reliable data management.

## http service architecture

### core adapter pattern

http services implement adapter pattern for flexible api integration:

```typescript
// base adapter interface
interface IRestHttpAdapter {
  request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse>
  readonly name: string
}

// adapter configuration
interface IAdapterConfig extends IBaseRequestConfig {
  timeout?: number
  baseUrl?: string
  headers?: HeadersInit
}
```

### rest client implementation

rest services provide standardized http communication:

```typescript
// rest client configuration
const restClient = createRestClient({
  baseUrl: 'https://pokeapi.co/api/v2',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
})

// client usage patterns
const fetchPokemonSpecies = async (id: number): Promise<IPokemonSpecies> => {
  return restClient.get(`/pokemon-species/${id}`, {
    cache: { revalidate: 30 * 60 }, // 30 minutes
  })
}
```

### graphql client integration

graphql services handle graph-based api communication:

```typescript
// graphql client setup
const graphqlClient = createGraphQLClient({
  endpoint: 'https://api.example.com/graphql',
  headers: {
    authorization: `bearer ${token}`,
  },
})

// query execution
const fetchUserProfile = async (id: string) => {
  const query = `
    query GetUserProfile($id: ID!) {
      user(id: $id) {
        id
        name
        email
        profile {
          avatar
          preferences
        }
      }
    }
  `

  return graphqlClient.request(query, { id })
}
```

## alternative adapter implementations

### understanding the adapter pattern

The HTTP service uses the adapter pattern to provide a consistent interface while allowing different underlying implementations. This architectural approach offers several key benefits:

**flexibility**: Switch between different HTTP libraries (fetch, axios, ky, etc.) without changing business logic
**testability**: Mock adapters easily for unit testing without coupling to specific HTTP implementations  
**consistency**: Unified error handling, request/response transformation, and configuration across all HTTP calls
**extensibility**: Add new adapters for specialized needs (authentication, caching, retry logic) without breaking existing code

### when to implement custom adapters

Consider creating or using alternative adapters when you need:

- **enhanced features**: Advanced request/response interceptors, automatic retries, or request deduplication
- **library preferences**: Team familiarity with specific HTTP libraries or existing codebase integration
- **performance optimization**: Specialized handling for large file uploads, streaming, or connection pooling
- **authentication integration**: Built-in token management, refresh logic, or SSO integration
- **legacy system support**: Custom headers, encoding, or protocol requirements for older APIs
- **monitoring integration**: Automatic logging, metrics collection, or distributed tracing

### implementation architecture

Our adapter pattern follows these core principles:

```typescript
// adapters implement standard interfaces
interface IRestHttpAdapter {
  request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse>
  readonly name: string
}

interface IGraphQLHttpAdapter {
  request<TResponse>(
    endpoint: string,
    query: string,
    config: IGraphQLRequestConfig,
  ): Promise<IGraphQLResponse<TResponse>>
  readonly name: string
}

// factory functions allow dynamic adapter selection
type TRestAdapterFactory = () => IRestHttpAdapter
type TGraphQLAdapterFactory = () => IGraphQLHttpAdapter
```

### default fetch adapters

The template includes fetch-based adapters by default for several strategic reasons:

**zero dependencies**: No additional packages required, reducing bundle size and security surface
**universal support**: Native browser API with Node.js support, ensuring compatibility across environments
**modern standards**: Built-in Promise support, streaming, and Request/Response objects aligned with web standards
**next.js integration**: Seamless integration with Next.js caching, revalidation, and Server Components

Here are alternative implementations using popular libraries when you need enhanced features:

### axios rest adapter

```typescript
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { IHttpRequestConfig, IRestHttpAdapter } from '../../core'

export class AxiosRestAdapter implements IRestHttpAdapter {
  readonly name = 'axios-rest'
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const { method, body, headers, timeout, signal, ...restOptions } = config

    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      data: body,
      headers: headers
        ? headers instanceof Headers
          ? Object.fromEntries(headers.entries())
          : Array.isArray(headers)
            ? Object.fromEntries(headers)
            : headers
        : undefined,
      timeout,
      signal,
      ...restOptions,
    }

    const response = await this.axiosInstance.request<TResponse>(axiosConfig)
    return response.data
  }
}
```

To use this adapter, install axios:

```bash
npm install axios
npm install --save-dev @types/axios
```

### graphql-request adapter

```typescript
import { GraphQLClient, Variables } from 'graphql-request'
import type {
  IGraphQLHttpAdapter,
  IGraphQLRequestConfig,
  IGraphQLResponse,
} from '../../core/core.type'
import { createHeaders, createTimeoutSignal } from '../../core/core.utils'

export class GraphQLRequestAdapter implements IGraphQLHttpAdapter {
  readonly name = 'graphql-request'

  async request<TResponse>(
    endpoint: string,
    query: string,
    config: IGraphQLRequestConfig,
  ): Promise<IGraphQLResponse<TResponse>> {
    const {
      variables,
      operationName,
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

    const client = new GraphQLClient(endpoint, {
      headers: finalHeaders,
      signal,
      ...restOptions,
    })

    try {
      const requestOptions: any = {}

      if (tags.length > 0 || revalidate !== undefined) {
        requestOptions.next = { tags, revalidate }
      }

      const data = await client.request<TResponse>({
        document: query,
        variables: variables as Variables,
        operationName,
        requestHeaders: finalHeaders,
        ...requestOptions,
      })

      return {
        data,
      } as IGraphQLResponse<TResponse>
    } catch (error: any) {
      if (error.response?.errors) {
        return {
          data: error.response.data,
          errors: error.response.errors,
        } as IGraphQLResponse<TResponse>
      }

      throw error
    }
  }

  private combineSignals(
    ...signals: (AbortSignal | undefined)[]
  ): AbortSignal | undefined {
    const validSignals = signals.filter(Boolean) as AbortSignal[]

    if (validSignals.length === 0) return undefined
    if (validSignals.length === 1) return validSignals[0]

    const controller = new AbortController()

    for (const signal of validSignals) {
      if (signal.aborted) {
        controller.abort()
        break
      }
      signal.addEventListener(
        'abort',
        () => {
          return controller.abort()
        },
        { once: true },
      )
    }

    return controller.signal
  }
}
```

To use this adapter, install graphql-request:

```bash
npm install graphql-request graphql
```

### extending with custom adapters

The adapter pattern makes it straightforward to extend the HTTP service with custom implementations:

#### step 1: implement the adapter interface

```typescript
// example: custom adapter with built-in authentication
export class AuthenticatedRestAdapter implements IRestHttpAdapter {
  readonly name = 'authenticated-rest'
  private authToken: string | null = null

  constructor(private tokenManager: TokenManager) {}

  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    // ensure fresh authentication token
    await this.ensureValidToken()

    const authHeaders = this.authToken
      ? { authorization: `bearer ${this.authToken}` }
      : {}

    const finalConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...authHeaders,
      },
    }

    return this.executeRequest<TResponse>(url, finalConfig)
  }

  private async ensureValidToken(): Promise<void> {
    if (!this.authToken || this.tokenManager.isExpired(this.authToken)) {
      this.authToken = await this.tokenManager.refreshToken()
    }
  }

  private async executeRequest<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: config.method,
      headers: config.headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`http error: ${response.status}`)
    }

    return response.json()
  }
}
```

#### step 2: configure the adapter

Update the HTTP_ADAPTER_CONFIG in `app/services/http/core/core.ts`:

```typescript
import { AuthenticatedRestAdapter } from './rest/adapters/authenticated-rest'
import { tokenManager } from '../auth/token-manager'

export const HTTP_ADAPTER_CONFIG: {
  restAdapter: TRestAdapterFactory
  graphqlAdapter: TGraphQLAdapterFactory
} = {
  restAdapter: () => {
    return new AuthenticatedRestAdapter(tokenManager)
  },
  graphqlAdapter: () => {
    return new FetchGraphQLAdapter() // keep default or use custom
  },
}
```

#### step 3: export and test

Add your adapter to the appropriate exports:

```typescript
// app/services/http/rest/adapters/index.ts
export { FetchRestAdapter } from './fetch-rest'
export { AuthenticatedRestAdapter } from './authenticated-rest'
```

Create comprehensive tests for your adapter:

```typescript
// authenticated-rest.test.ts
describe('AuthenticatedRestAdapter', () => {
  it('should automatically add auth headers', async () => {
    const mockTokenManager = {
      isExpired: vi.fn().mockReturnValue(false),
      refreshToken: vi.fn().mockResolvedValue('fresh-token'),
    }

    const adapter = new AuthenticatedRestAdapter(mockTokenManager)

    // test implementation...
  })
})
```

## tanstack query integration

### query configuration patterns

react query provides caching and synchronization for server state:

```typescript
// query hook implementation
const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: () => fetchPokemonSpecies(id),
    staleTime: 1000 * 60 * SPECIES_CACHE_MINUTES, // 30 minutes
    gcTime: 1000 * 60 * SPECIES_GC_MINUTES, // 60 minutes
    retry: RETRY_COUNT,
    enabled: !!id,
  })
}

// query configuration constants
const POKEMON_SPECIES_CONFIG = {
  SPECIES_CACHE_MINUTES: 30,
  SPECIES_GC_MINUTES: 60,
  RETRY_COUNT: 2,
} as const
```

### mutation handling

mutations manage server state changes with optimistic updates:

```typescript
// mutation hook
const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserProfile,
    onMutate: async (variables) => {
      // optimistic update
      await queryClient.cancelQueries({ queryKey: ['user-profile'] })
      const previousProfile = queryClient.getQueryData(['user-profile'])

      queryClient.setQueryData(['user-profile'], variables)
      return { previousProfile }
    },
    onError: (error, variables, context) => {
      // revert optimistic update
      if (context?.previousProfile) {
        queryClient.setQueryData(['user-profile'], context.previousProfile)
      }
    },
    onSettled: () => {
      // refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
    },
  })
}
```

### query invalidation strategies

cache invalidation ensures data consistency:

```typescript
// invalidation after mutations
const useCreatePokemon = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPokemon,
    onSuccess: () => {
      // invalidate list queries
      queryClient.invalidateQueries({ queryKey: [POKEMON_LIST_QUERY_KEY] })
      // invalidate related species data
      queryClient.invalidateQueries({ queryKey: [POKEMON_SPECIES_QUERY_KEY] })
    },
  })
}

// manual invalidation
const refreshPokemonData = () => {
  queryClient.invalidateQueries({
    predicate: (query) => query.queryKey[0] === 'pokemon',
  })
}
```

## error handling patterns

### client-side error management

http clients implement consistent error handling:

```typescript
// error response interface
interface IHttpError {
  message: string
  status: number
  code?: string
  details?: Record<string, unknown>
}

// error handling in adapters
const axiosAdapter: IRestHttpAdapter = {
  async request<TResponse>(
    url: string,
    config: IHttpRequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await axios.request({ url, ...config })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.message,
          status: error.response?.status || 0,
          code: error.code,
          details: error.response?.data,
        } as IHttpError
      }
      throw error
    }
  },
}
```

### query error boundaries

error boundaries provide graceful error handling:

```typescript
// error boundary component
const ApiErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <div className="error-container">
          <h2>something went wrong</h2>
          <p>{error.message}</p>
          <button onClick={() => window.location.reload()}>
            refresh page
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// query error handling
const PokemonSpeciesDisplay: React.FC<{ id: number }> = ({ id }) => {
  const { data, error, isLoading, retry } = usePokemonSpecies(id)

  if (error) {
    return (
      <div className="error-state">
        <p>failed to load pokemon species</p>
        <button onClick={() => retry()}>try again</button>
      </div>
    )
  }

  if (isLoading) return <Spinner />

  return <div>{data?.name}</div>
}
```

## loading state management

### loading indicators

loading states provide user feedback during data operations:

```typescript
// loading state hooks
const useLoadingStates = () => {
  const pokemonQuery = usePokemonSpecies(25)
  const userQuery = useUserProfile('user-123')

  return {
    isLoading: pokemonQuery.isLoading || userQuery.isLoading,
    isError: pokemonQuery.isError || userQuery.isError,
    errors: [pokemonQuery.error, userQuery.error].filter(Boolean)
  }
}

// loading component with multiple states
const DataLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isError, errors } = useLoadingStates()

  if (isLoading) return <Spinner text="loading data..." />
  if (isError) return <ErrorDisplay errors={errors} />

  return <>{children}</>
}
```

### skeleton loading patterns

skeleton screens improve perceived performance:

```typescript
// skeleton component
const PokemonCardSkeleton: React.FC = () => {
  return (
    <div className="pokemon-card skeleton">
      <div className="skeleton-image animate-pulse bg-gray-300 h-32 w-32 rounded" />
      <div className="skeleton-name animate-pulse bg-gray-300 h-6 w-24 rounded" />
      <div className="skeleton-type animate-pulse bg-gray-300 h-4 w-16 rounded" />
    </div>
  )
}

// conditional skeleton rendering
const PokemonList: React.FC = () => {
  const { data, isLoading } = usePokemonList()

  if (isLoading) {
    return (
      <div className="pokemon-grid">
        {Array(8).fill(0).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="pokemon-grid">
      {data?.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}
```

## caching strategies

### client-side caching

react query handles intelligent caching with customizable policies:

```typescript
// cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (error.status === 404) return false
        return failureCount < 3
      },
    },
  },
})

// cache persistence
const persistQueryClient = () => {
  persistQueryClient({
    queryClient,
    persister: createSyncStoragePersister({
      storage: window.localStorage,
      key: 'pokemon-cache',
    }),
  })
}
```

### cache invalidation

strategic cache invalidation maintains data consistency:

```typescript
// time-based invalidation
useEffect(() => {
  const interval = setInterval(() => {
    queryClient.invalidateQueries({
      queryKey: ['real-time-data'],
      exact: true,
    })
  }, 30000) // 30 seconds

  return () => clearInterval(interval)
}, [])

// event-driven invalidation
const useRealtimeInvalidation = () => {
  useEffect(() => {
    const socket = new WebSocket('wss://api.example.com')

    socket.onmessage = (event) => {
      const { type, resourceId } = JSON.parse(event.data)

      if (type === 'pokemon-updated') {
        queryClient.invalidateQueries({
          queryKey: [POKEMON_SPECIES_QUERY_KEY, resourceId],
        })
      }
    }

    return () => socket.close()
  }, [])
}
```

## request optimization

### request deduplication

react query automatically deduplicates identical requests:

```typescript
// automatic deduplication
const PokemonDisplay: React.FC = () => {
  // both components requesting same data simultaneously
  const pokemon1 = usePokemonSpecies(25) // single request made
  const pokemon2 = usePokemonSpecies(25) // deduplicates to same request

  return (
    <div>
      <PokemonCard pokemon={pokemon1.data} />
      <PokemonCard pokemon={pokemon2.data} />
    </div>
  )
}
```

### background refetching

background updates keep data fresh without disrupting user experience:

```typescript
// background refetch configuration
const usePokemonWithBackgroundRefetch = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: () => fetchPokemonSpecies(id),
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })
}
```

### prefetching strategies

proactive data loading improves user experience:

```typescript
// prefetch related data
const usePokemonWithPrefetch = (id: number) => {
  const queryClient = useQueryClient()
  const pokemon = usePokemonSpecies(id)

  // prefetch evolution chain when pokemon loads
  useEffect(() => {
    if (pokemon.data?.evolutionChainId) {
      queryClient.prefetchQuery({
        queryKey: ['evolution-chain', pokemon.data.evolutionChainId],
        queryFn: () => fetchEvolutionChain(pokemon.data.evolutionChainId),
        staleTime: 10 * 60 * 1000,
      })
    }
  }, [pokemon.data])

  return pokemon
}

// router-based prefetching
const usePrefetchOnHover = () => {
  const queryClient = useQueryClient()

  const prefetchPokemon = (id: number) => {
    queryClient.prefetchQuery({
      queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
      queryFn: () => fetchPokemonSpecies(id),
    })
  }

  return { prefetchPokemon }
}
```

## data transformation

### response normalization

consistent data structure across different apis:

```typescript
// api response transformer
const transformPokemonResponse = (apiData: any): IPokemonSpecies => {
  return {
    id: apiData.id,
    name: apiData.name,
    evolutionChain: apiData.evolution_chain?.url?.split('/').slice(-2)[0] || '',
    habitat: apiData.habitat?.name || 'unknown',
    flavorText:
      apiData.flavor_text_entries?.find((entry) => entry.language.name === 'en')
        ?.flavor_text || '',
  }
}

// query with transformation
const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: async () => {
      const response = await fetchPokemonSpecies(id)
      return transformPokemonResponse(response)
    },
  })
}
```

### data aggregation

combining multiple api responses into unified data structures:

```typescript
// aggregate multiple queries
const usePokemonComplete = (id: number) => {
  const species = usePokemonSpecies(id)
  const pokemon = usePokemon(id)
  const evolution = useEvolutionChain(species.data?.evolutionChainId)

  return {
    data:
      species.data && pokemon.data
        ? {
            ...species.data,
            ...pokemon.data,
            evolutionChain: evolution.data,
          }
        : undefined,
    isLoading: species.isLoading || pokemon.isLoading || evolution.isLoading,
    error: species.error || pokemon.error || evolution.error,
  }
}
```

## testing data fetching

### mocking api responses

test utilities for reliable data fetching tests:

```typescript
// mock service responses
const createMockPokemonSpecies = (overrides = {}): IPokemonSpecies => ({
  id: 25,
  name: 'pikachu',
  evolutionChain: 'pichu-pikachu-raichu',
  habitat: 'forest',
  ...overrides,
})

// mock api client
const mockRestClient = {
  get: vi.fn().mockResolvedValue(createMockPokemonSpecies()),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}

// test query hook
describe('usePokemonSpecies', () => {
  it('should fetch pokemon species successfully', async () => {
    mockRestClient.get.mockResolvedValue(createMockPokemonSpecies())

    const { result } = renderHook(() => usePokemonSpecies(25), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(
        expect.objectContaining({
          id: 25,
          name: 'pikachu',
        }),
      )
    })
  })
})
```
