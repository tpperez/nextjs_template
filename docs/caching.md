# Caching

Caching implementation across client-side state management, server-side optimization, and browser-level performance to minimize redundant requests while maintaining data freshness.

## Table of Contents

- [Caching Architecture](#caching-architecture)
- [Client-Side Caching Strategy](#client-side-caching-strategy)
- [React Query Configuration](#react-query-configuration)
- [Cache Invalidation Patterns](#cache-invalidation-patterns)
- [Optimistic Updates](#optimistic-updates)
- [Performance Optimization](#performance-optimization)
- [Next.js Server Caching](#nextjs-server-caching)
- [Caching Patterns](#caching-patterns)
- [Testing Cache Behavior](#testing-cache-behavior)
- [Cache Management](#cache-management)

## Related Documentation

- [Data Fetching](./data-fetching.md) - HTTP service integration and cache coordination strategies
- [Architecture](./architecture.md) - Performance optimization within architectural layers
- [State Management](./state-management.md) - Server state caching with TanStack Query
- [Testing](./testing.md) - Cache behavior testing and validation patterns
- [Examples](./examples.md) - Practical caching implementation examples

## Caching Architecture

The template uses a multi-layered caching strategy that coordinates between browser cache, React Query's in-memory cache, and Next.js server-side caching. This approach minimizes network requests while ensuring users see fresh data when it matters.

## Caching Layers (Top to Bottom)

| Layer                 | Purpose                     | Examples                 |
| --------------------- | --------------------------- | ------------------------ |
| **Browser Cache**     | Static assets, HTTP cache   | Images, CSS, JS files    |
| **React Query Cache** | In-memory server state      | API responses, user data |
| **Next.js Cache**     | Server-side data & requests | SSG, ISR, API responses  |
| **Network Cache**     | HTTP-level caching          | CDN, proxy cache         |

**Flow:** User Request → Browser Cache → React Query → Next.js Cache → Network/API

This architecture provides multiple cache layers that work together to optimize performance. The browser cache handles static assets, React Query manages client-side state, Next.js handles server-side data, and the network layer communicates with external APIs.

### Cache Layer Responsibilities

Each caching layer serves specific purposes within the overall strategy:

#### Browser Cache

Handles static assets like images, CSS, and JavaScript files. The template configures appropriate cache headers for different asset types through Next.js configuration.

#### React Query Cache

Manages server state in memory with intelligent staleness detection and background updates. This layer prevents redundant API calls and provides instant UI updates through cached data.

#### Next.js Cache

Provides server-side caching for API responses and static generation. Integrates with React Query through the fetch adapter to coordinate cache strategies.

#### Network Cache

Handles HTTP-level caching for external API responses at the network layer.

## Client-Side Caching Strategy

The template uses [TanStack Query](https://tanstack.com/query/latest) for client-side caching that adapts to different data patterns and user behaviors.

### Cache Configuration by Data Type

Different types of data require different caching strategies based on their update frequency and importance. For detailed configuration options, refer to the [TanStack Query Caching documentation](https://tanstack.com/query/latest/docs/react/guides/caching).

```typescript
// Long-lived reference data - Static content that rarely changes
const useReferenceData = (entityId: number | undefined) => {
  return useQuery({
    queryKey: ['reference-data', entityId],
    queryFn: () => fetchReferenceData(entityId!),
    enabled: !!entityId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    retry: 2,
  })
}

// Moderate cache for semi-dynamic content
const useDynamicContent = (identifier: string) => {
  return useQuery({
    queryKey: ['dynamic-content', identifier],
    queryFn: () => fetchDynamicContent(identifier),
    staleTime: 1000 * 60 * 15, // 15 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    enabled: !!identifier,
  })
}

// Short cache for frequently changing data
export const useInfiniteEntities = ({ initialOffset = 8 } = {}) => {
  return useInfiniteQuery({
    queryKey: ['entities', 'infinite'],
    queryFn: async ({ pageParam = initialOffset }) => {
      // Implementation details...
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: false, // Manual triggering for performance
  })
}
```

## React Query Configuration

The template configures React Query with opinionated defaults that balance performance with development experience. For configuration options, see the [TanStack Query Configuration Guide](https://tanstack.com/query/latest/docs/react/reference/QueryClient).

### Provider Configuration

The `HttpProvider` in `app/services/http/providers/react-query.tsx` establishes global caching behavior:

```typescript
export const HttpProvider = ({ children }: HttpProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: HTTP_CONFIG.DEFAULT_STALE_TIME, // 5 minutes
          retry: HTTP_CONFIG.DEFAULT_RETRY_COUNT,    // 1 retry (vs React Query's default of 3)
          refetchOnWindowFocus: false,               // Disabled (vs React Query's default of true)
          refetchOnReconnect: 'always',             // React Query's default
        },
        mutations: {
          retry: false,                             // Don't retry mutations automatically
        },
      },
    })
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

These defaults prioritize developer experience by reducing aggressive refetching while maintaining data freshness when reconnecting.

### Cache Lifecycle Management

React Query manages cache lifecycle through two key timing configurations:

```mermaid
graph LR
    subgraph "Cache Lifecycle"
        Fresh[Fresh Data] --> Stale[Stale Data]
        Stale --> BG[Background Refetch]
        Stale --> GC[Garbage Collection]
        BG --> Fresh
        GC --> Removed[Removed from Cache]
    end

    subgraph "Configuration"
        ST[staleTime: 15 min]
        GT[gcTime: 30 min]
    end

    ST --> Stale
    GT --> GC

    style Fresh fill:#e8f5e8
    style Stale fill:#fff3e0
    style Removed fill:#ffebee
```

**staleTime**: Determines how long data remains fresh. During this period, React Query serves cached data without network requests.

**gcTime** (formerly cacheTime): Controls how long stale data remains in memory. This allows instant loading when users return to previously viewed data.

## Cache Invalidation Patterns

The template implements strategic cache invalidation to maintain data consistency without excessive network activity. For detailed invalidation strategies, refer to the [TanStack Query Invalidation Guide](https://tanstack.com/query/latest/docs/react/guides/query-invalidation).

### Mutation-Based Invalidation

Mutations automatically invalidate related cache entries to ensure UI consistency:

```typescript
const useUpdateEntityData = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEntityInDatabase,
    onSuccess: (data, variables) => {
      // Invalidate specific entity data
      queryClient.invalidateQueries({
        queryKey: ['reference-data', variables.id],
      })

      // Invalidate related dynamic content
      queryClient.invalidateQueries({
        queryKey: ['dynamic-content', variables.name],
      })

      // Invalidate list queries to reflect changes
      queryClient.invalidateQueries({
        queryKey: ['entities', 'infinite'],
      })
    },
  })
}
```

### Selective Invalidation Strategies

Different scenarios require different invalidation approaches:

```typescript
// Exact match invalidation - only specific query
queryClient.invalidateQueries({
  queryKey: ['reference-data', 25],
  exact: true,
})

// Prefix match invalidation - all reference data queries
queryClient.invalidateQueries({
  queryKey: ['reference-data'],
})

// Predicate-based invalidation - complex logic
queryClient.invalidateQueries({
  predicate: (query) => {
    const [queryType, identifier] = query.queryKey
    return (
      queryType === 'dynamic-content' &&
      identifier?.toString().startsWith('prefix')
    )
  },
})
```

### Time-Based Invalidation

Automatic cache invalidation for time-sensitive data:

```typescript
const useAutoInvalidation = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      // Invalidate real-time data every 30 seconds
      queryClient.invalidateQueries({
        queryKey: ['real-time-data'],
        exact: true,
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [queryClient])
}
```

## Optimistic Updates

The template supports optimistic updates that provide immediate feedback while maintaining data consistency. For optimistic update patterns, see the [TanStack Query Optimistic Updates Guide](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates).

### Optimistic Update Pattern

```typescript
const useOptimisticFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEntityFavorite,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches for favorites
      await queryClient.cancelQueries({
        queryKey: ['entity-favorites'],
      })

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(['entity-favorites'])

      // Optimistically update the cache
      queryClient.setQueryData(['entity-favorites'], (old: IEntity[]) => {
        if (variables.action === 'add') {
          return [...(old || []), variables.entity]
        } else {
          return old?.filter((e) => e.id !== variables.entity.id) || []
        }
      })

      // Return context with rollback data
      return { previousFavorites }
    },
    onError: (error, variables, context) => {
      // Rollback optimistic update on error
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ['entity-favorites'],
          context.previousFavorites,
        )
      }
    },
    onSettled: () => {
      // Always refetch to sync with server state
      queryClient.invalidateQueries({
        queryKey: ['entity-favorites'],
      })
    },
  })
}
```

### Optimistic UI Implementation

Components can provide immediate feedback using optimistic updates:

```typescript
const FavoriteButton: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const optimisticUpdate = useOptimisticFavorite()
  const { data: favorites } = useFavorites()

  const isFavorite = favorites?.some(f => f.id === entity.id) ?? false

  const handleToggle = () => {
    optimisticUpdate.mutate({
      entity,
      action: isFavorite ? 'remove' : 'add'
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={optimisticUpdate.isPending}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    >
      {optimisticUpdate.isPending ? '⏳' : (isFavorite ? '❤️' : '🤍')}
    </button>
  )
}
```

## Performance Optimization

The template includes several performance optimization strategies for cache management.

### Cache Size Monitoring

Monitor cache memory usage to prevent performance degradation:

```typescript
const useCacheMonitoring = () => {
  const queryClient = useQueryClient()

  const getCacheMetrics = () => {
    const cache = queryClient.getQueryCache()
    const queries = cache.getAll()

    return {
      totalQueries: queries.length,
      activeQueries: queries.filter((q) => q.getObserversCount() > 0).length,
      staleQueries: queries.filter((q) => q.isStale()).length,
      errorQueries: queries.filter((q) => q.state.error).length,
      estimatedSize: queries.reduce((size, query) => {
        return size + JSON.stringify(query.state.data || '').length
      }, 0),
    }
  }

  return { getCacheMetrics }
}
```

### Prefetching Strategies

Proactive data loading improves user experience. Learn more about prefetching in the [TanStack Query Prefetching Guide](https://tanstack.com/query/latest/docs/react/guides/prefetching):

```typescript
const usePrefetchStrategy = () => {
  const queryClient = useQueryClient()

  // Prefetch on hover for entity cards
  const prefetchEntityOnHover = useCallback(
    (entityId: number) => {
      queryClient.prefetchQuery({
        queryKey: ['reference-data', entityId],
        queryFn: () => fetchReferenceData(entityId),
        staleTime: 10 * 60 * 1000, // 10 minutes
      })
    },
    [queryClient],
  )

  // Prefetch related data when viewing entity details
  const prefetchRelatedData = useCallback(
    (entityName: string) => {
      queryClient.prefetchQuery({
        queryKey: ['dynamic-content', entityName],
        queryFn: () => fetchDynamicContent(entityName),
        staleTime: 15 * 60 * 1000,
      })
    },
    [queryClient],
  )

  return { prefetchEntityOnHover, prefetchRelatedData }
}
```

### Background Synchronization

Keep data fresh without disrupting user experience:

```typescript
const useBackgroundSync = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    // Sync active queries in background
    const syncInterval = setInterval(
      () => {
        queryClient.refetchQueries({
          type: 'active',
          stale: true,
        })
      },
      2 * 60 * 1000,
    ) // Every 2 minutes

    return () => clearInterval(syncInterval)
  }, [queryClient])

  // Sync on network reconnection
  useEffect(() => {
    const handleOnline = () => {
      queryClient.refetchQueries({ type: 'active' })
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [queryClient])
}
```

## Next.js Server Caching

The template integrates React Query caching with Next.js server-side caching for performance optimization. For more details on Next.js caching strategies, see the [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching).

### Fetch Cache Integration

The HTTP adapters integrate with Next.js caching through fetch options:

```typescript
// Reference data with longer cache time
const response = await restClient.get<IReferenceData>(`/reference/${id}`, {
  baseUrl: 'https://api.example.com/v1',
  revalidate: 3600, // Cache for 1 hour
})

// Dynamic content with shorter cache time
const response = await graphqlClient.query<IEntitiesResponse>(
  GET_ENTITIES_QUERY,
  variables,
  {
    baseUrl: 'https://graphql.example.com/graphql',
    revalidate: 300, // Cache for 5 minutes
  },
)
```

### Cache Coordination Strategy

```mermaid
graph TB
    subgraph "Request Flow"
        Request[Incoming Request]
        RQC[React Query Check]
        NSC[Next.js Server Cache]
        API[External API]
        Response[Response to Client]
    end

    subgraph "Cache Decisions"
        Fresh{Data Fresh?}
        Cached{Server Cached?}
        Stale{Background Update?}
    end

    Request --> RQC
    RQC --> Fresh
    Fresh -->|Yes| Response
    Fresh -->|No| NSC
    NSC --> Cached
    Cached -->|Yes| Response
    Cached -->|No| API
    API --> Response

    Response --> Stale
    Stale -->|Yes| API

    style Fresh fill:#e8f5e8
    style Cached fill:#fff3e0
    style API fill:#ffebee
```

This coordination ensures server-side and client-side caches work together rather than competing.

### Tag-Based Cache Management

Use cache tags for precise invalidation:

```typescript
// Tag-based caching in queries
const response = await graphqlClient.query(
  GET_ENTITY_DETAILS,
  { id: entityId },
  {
    tags: [`entity-${entityId}`, 'entity-details'],
    revalidate: 300,
  },
)

// Programmatic cache invalidation
import { revalidateTag } from 'next/cache'

const updateEntityDetails = async (entityId: string) => {
  // Update data in database
  await updateDetailsInDatabase(entityId)

  // Invalidate specific entity cache
  revalidateTag(`entity-${entityId}`)

  // Invalidate all entity details cache
  revalidateTag('entity-details')
}
```

## Caching Patterns

The template demonstrates common caching patterns that can be applied to various types of data and APIs.

### Reference Data Caching

Long-lived static data with extended cache times:

```typescript
// Configuration: 30-minute stale time, 60-minute garbage collection
const useReferenceData = (dataId: number | undefined) => {
  return useQuery({
    queryKey: ['reference-data', dataId],
    queryFn: () => fetchReferenceData(dataId!),
    enabled: !!dataId,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 60 minutes
    retry: 2,
  })
}
```

### Dynamic Content Caching

Moderate caching for semi-dynamic content:

```typescript
// Configuration: 15-minute stale time, 30-minute garbage collection
const useDynamicContent = (identifier: string) => {
  return useQuery({
    queryKey: ['dynamic-content', identifier],
    queryFn: () => fetchDynamicContent(identifier),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    enabled: !!identifier,
  })
}
```

### Infinite Query Caching

Pagination with intelligent cache management:

```typescript
// Configuration: Manual triggering with 5-minute stale time
export const useInfiniteEntities = ({ initialOffset = 8 } = {}) => {
  return useInfiniteQuery({
    queryKey: ['entities', 'infinite'],
    queryFn: async ({ pageParam = initialOffset }) => {
      const response = await graphqlClient.query<IEntitiesResponse>(
        GET_ENTITIES_QUERY,
        {
          limit: ENTITIES_PER_PAGE,
          offset: pageParam,
        },
        {
          baseUrl: 'https://api.example.com/graphql',
        },
      )

      return {
        data: response.data?.entities?.results || [],
        nextOffset: pageParam + ENTITIES_PER_PAGE,
      }
    },
    initialPageParam: initialOffset,
    getNextPageParam: (lastPage) => {
      return totalLoaded < totalCount ? lastPage.nextOffset : undefined
    },
    staleTime: 5 * 60 * 1000,
    enabled: false, // Manual trigger for performance
  })
}
```

## Testing Cache Behavior

The template includes testing patterns for cache functionality. For detailed testing guidance, see the [TanStack Query Testing Guide](https://tanstack.com/query/latest/docs/react/guides/testing).

### Cache State Testing

Test cache behavior without external dependencies:

```typescript
describe('Reference Data Cache', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('should cache reference data correctly', async () => {
    const mockData = createMockReferenceData({ id: 25, name: 'test-entity' })
    mockRestClient.get.mockResolvedValue(mockData)

    const { result } = renderHook(() => useReferenceData(25), {
      wrapper: createQueryWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })

    // Verify data is cached
    const cachedData = queryClient.getQueryData(['reference-data', 25])
    expect(cachedData).toEqual(mockData)

    // Verify cache configuration
    const query = queryClient.getQueryState(['reference-data', 25])
    expect(query?.dataUpdatedAt).toBeTruthy()
  })

  it('should handle cache invalidation correctly', async () => {
    // Setup initial cache state
    queryClient.setQueryData(['reference-data', 25], createMockReferenceData())

    const { result } = renderHook(() => useUpdateReferenceData(), {
      wrapper: createQueryWrapper(queryClient),
    })

    await act(async () => {
      result.current.mutate({ id: 25, updates: { name: 'updated-entity' } })
    })

    // Verify cache was invalidated
    const queryState = queryClient.getQueryState(['reference-data', 25])
    expect(queryState?.isInvalidated).toBe(true)
  })
})
```

### Cache Timing Tests

Verify cache timing configurations:

```typescript
describe('Cache Configuration', () => {
  it('should use correct cache timings for reference data', () => {
    const expectedStaleTime = REFERENCE_DATA_CONFIG.CACHE_MINUTES * 60 * 1000
    const expectedGcTime = REFERENCE_DATA_CONFIG.GC_MINUTES * 60 * 1000

    expect(expectedStaleTime).toBe(30 * 60 * 1000) // 30 minutes
    expect(expectedGcTime).toBe(60 * 60 * 1000) // 60 minutes
  })

  it('should use correct cache timings for dynamic content', () => {
    const expectedStaleTime = DYNAMIC_CONTENT_CONFIG.CACHE_MINUTES * 60 * 1000
    const expectedGcTime = DYNAMIC_CONTENT_CONFIG.GC_MINUTES * 60 * 1000

    expect(expectedStaleTime).toBe(15 * 60 * 1000) // 15 minutes
    expect(expectedGcTime).toBe(30 * 60 * 1000) // 30 minutes
  })
})
```

## Cache Management

Teams can extend and customize the caching system based on their specific requirements.

### Custom Cache Strategies

Implement specialized caching for unique data patterns:

```typescript
// Time-sensitive data with automatic invalidation
const useRealTimeData = (endpoint: string, interval: number = 30000) => {
  return useQuery({
    queryKey: ['real-time', endpoint],
    queryFn: () => fetchRealTimeData(endpoint),
    staleTime: 0, // Always consider stale
    refetchInterval: interval,
    refetchIntervalInBackground: true,
  })
}

// User-specific data with automatic cleanup
const useUserSpecificData = (userId: string, dataType: string) => {
  const queryClient = useQueryClient()

  // Clear user data on logout
  useEffect(() => {
    const handleLogout = () => {
      queryClient.removeQueries({
        predicate: (query) => {
          const [type, id] = query.queryKey
          return (
            typeof type === 'string' && type.includes('user') && id === userId
          )
        },
      })
    }

    window.addEventListener('logout', handleLogout)
    return () => window.removeEventListener('logout', handleLogout)
  }, [queryClient, userId])

  return useQuery({
    queryKey: ['user-data', userId, dataType],
    queryFn: () => fetchUserData(userId, dataType),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### Environment-Specific Configuration

Adjust caching behavior based on environment:

```typescript
const getCacheConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    staleTime: isDevelopment
      ? 0 // Always fresh in development
      : 5 * 60 * 1000, // 5 minutes in production

    gcTime: isDevelopment
      ? 0 // No caching in development
      : 30 * 60 * 1000, // 30 minutes in production

    refetchOnMount: isDevelopment ? 'always' : true,
    refetchOnWindowFocus: !isProduction,
  }
}
```

The caching system provides a foundation that teams can customize while maintaining the benefits of cache management and performance optimization.

---

## References

| Resource                                                                                                    | Description                                              |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [TanStack Query](https://tanstack.com/query/latest)                                                         | Data synchronization library for React applications      |
| [TanStack Query Caching Guide](https://tanstack.com/query/latest/docs/react/guides/caching)                 | Guide to caching strategies and configuration            |
| [TanStack Query Configuration](https://tanstack.com/query/latest/docs/react/reference/QueryClient)          | QueryClient configuration options and setup              |
| [TanStack Query Invalidation Guide](https://tanstack.com/query/latest/docs/react/guides/query-invalidation) | Cache invalidation patterns and best practices           |
| [TanStack Query Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates) | Implementing optimistic UI updates with cache management |
| [TanStack Query Prefetching Guide](https://tanstack.com/query/latest/docs/react/guides/prefetching)         | Data prefetching strategies for better user experience   |
| [TanStack Query Testing Guide](https://tanstack.com/query/latest/docs/react/guides/testing)                 | Testing patterns for cached data and query behavior      |
| [Next.js Caching Documentation](https://nextjs.org/docs/app/building-your-application/caching)              | Server-side caching strategies and configuration         |
