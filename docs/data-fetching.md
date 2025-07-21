# Data Fetching

API integration patterns and data retrieval strategies for efficient and reliable data management.

## http service architecture

### core adapter pattern

http services implement adapter pattern for flexible api integration:

```typescript
// base adapter interface
interface IRestHttpAdapter {
  request<TResponse>(url: string, config: IHttpRequestConfig): Promise<TResponse>
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
    'content-type': 'application/json'
  }
})

// client usage patterns
const fetchPokemonSpecies = async (id: number): Promise<IPokemonSpecies> => {
  return restClient.get(`/pokemon-species/${id}`, {
    cache: { revalidate: 30 * 60 } // 30 minutes
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
    'authorization': `bearer ${token}`
  }
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
    enabled: !!id
  })
}

// query configuration constants
const POKEMON_SPECIES_CONFIG = {
  SPECIES_CACHE_MINUTES: 30,
  SPECIES_GC_MINUTES: 60,
  RETRY_COUNT: 2
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
    }
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
    }
  })
}

// manual invalidation
const refreshPokemonData = () => {
  queryClient.invalidateQueries({
    predicate: (query) => query.queryKey[0] === 'pokemon'
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
  async request<TResponse>(url: string, config: IHttpRequestConfig): Promise<TResponse> {
    try {
      const response = await axios.request({ url, ...config })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw {
          message: error.message,
          status: error.response?.status || 0,
          code: error.code,
          details: error.response?.data
        } as IHttpError
      }
      throw error
    }
  }
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
      }
    }
  }
})

// cache persistence
const persistQueryClient = () => {
  persistQueryClient({
    queryClient,
    persister: createSyncStoragePersister({
      storage: window.localStorage,
      key: 'pokemon-cache'
    })
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
      exact: true
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
          queryKey: [POKEMON_SPECIES_QUERY_KEY, resourceId]
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
    refetchOnReconnect: true
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
        staleTime: 10 * 60 * 1000
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
      queryFn: () => fetchPokemonSpecies(id)
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
    flavorText: apiData.flavor_text_entries
      ?.find(entry => entry.language.name === 'en')
      ?.flavor_text || ''
  }
}

// query with transformation
const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: async () => {
      const response = await fetchPokemonSpecies(id)
      return transformPokemonResponse(response)
    }
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
    data: species.data && pokemon.data ? {
      ...species.data,
      ...pokemon.data,
      evolutionChain: evolution.data
    } : undefined,
    isLoading: species.isLoading || pokemon.isLoading || evolution.isLoading,
    error: species.error || pokemon.error || evolution.error
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
  ...overrides
})

// mock api client
const mockRestClient = {
  get: vi.fn().mockResolvedValue(createMockPokemonSpecies()),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
}

// test query hook
describe('usePokemonSpecies', () => {
  it('should fetch pokemon species successfully', async () => {
    mockRestClient.get.mockResolvedValue(createMockPokemonSpecies())

    const { result } = renderHook(
      () => usePokemonSpecies(25),
      { wrapper: createQueryWrapper() }
    )

    await waitFor(() => {
      expect(result.current.data).toEqual(expect.objectContaining({
        id: 25,
        name: 'pikachu'
      }))
    })
  })
})
