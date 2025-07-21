# Caching

Performance optimization strategies including client-side caching, server-side caching, cache invalidation policies, and performance monitoring procedures.

## client-side caching architecture

### tanstack query configuration

react query provides intelligent client-side caching with configurable policies:

```typescript
// query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
      retry: (failureCount, error) => {
        if (error?.status === 404) return false
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error, variables, context) => {
        console.error('mutation failed:', error)
      },
    },
  },
})

// cache persistence configuration
const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'react-query-cache',
  serialize: JSON.stringify,
  deserialize: JSON.parse,
})

// persist query client
persistQueryClient({
  queryClient,
  persister,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  buster: process.env.REACT_APP_VERSION, // bust cache on version change
})
```

### cache strategies by data type

different data types require specific caching strategies:

```typescript
// static reference data - long cache
const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: Infinity, // never stale
    gcTime: Infinity, // never garbage collected
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
}

// user profile data - moderate cache
const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => fetchUserProfile(userId),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    enabled: !!userId,
  })
}

// real-time data - minimal cache
const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    staleTime: 0, // always stale
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // refetch every 30 seconds
    refetchIntervalInBackground: true,
  })
}

// pokemon species - example with custom cache config
const usePokemonSpecies = (id: number) => {
  return useQuery({
    queryKey: [POKEMON_SPECIES_QUERY_KEY, id],
    queryFn: () => fetchPokemonSpecies(id),
    staleTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_CACHE_MINUTES, // 30 minutes
    gcTime: 1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_GC_MINUTES, // 60 minutes
    retry: POKEMON_SPECIES_CONFIG.RETRY_COUNT,
    enabled: !!id,
  })
}
```

### cache invalidation patterns

strategic cache invalidation maintains data consistency:

```typescript
// mutation with cache invalidation
const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data, variables) => {
      // invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ['user-profile', variables.userId],
      })

      // update cache directly
      queryClient.setQueryData(['user-profile', variables.userId], data)
    },
  })
}

// bulk invalidation patterns
const invalidateUserData = (queryClient: QueryClient, userId: string) => {
  // invalidate all user-related queries
  queryClient.invalidateQueries({
    predicate: (query) => {
      const [queryType, id] = query.queryKey
      return (
        typeof queryType === 'string' &&
        queryType.startsWith('user') &&
        id === userId
      )
    },
  })
}

// selective invalidation
const useCreatePokemon = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPokemon,
    onSuccess: () => {
      // invalidate list queries but keep individual pokemon cached
      queryClient.invalidateQueries({
        queryKey: [POKEMON_LIST_QUERY_KEY],
        exact: true,
      })

      // refetch visible list data
      queryClient.refetchQueries({
        queryKey: [POKEMON_LIST_QUERY_KEY],
        type: 'active',
      })
    },
  })
}
```

## optimistic updates

### optimistic mutation patterns

immediate ui updates with rollback on failure:

```typescript
const useOptimisticUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePokemonFavorite,
    onMutate: async (variables) => {
      // cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['pokemon-favorites']
      })

      // snapshot previous value
      const previousFavorites = queryClient.getQueryData(['pokemon-favorites'])

      // optimistically update cache
      queryClient.setQueryData(['pokemon-favorites'], (old: IPokemon[]) => {
        if (variables.action === 'add') {
          return [...(old || []), variables.pokemon]
        } else {
          return old?.filter(p => p.id !== variables.pokemon.id) || []
        }
      })

      // return rollback context
      return { previousFavorites }
    },
    onError: (error, variables, context) => {
      // rollback optimistic update
      if (context?.previousFavorites) {
        queryClient.setQueryData(['pokemon-favorites'], context.previousFavorites)
      }

      // show error notification
      showErrorNotification('failed to update favorites')
    },
    onSettled: () => {
      // refetch to sync with server
      queryClient.invalidateQueries({
        queryKey: ['pokemon-favorites']
      })
    }
  })
}

// optimistic ui component
const FavoriteButton: React.FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  const optimisticUpdate = useOptimisticUpdate()
  const { data: favorites } = useFavorites()

  const isFavorite = favorites?.some(f => f.id === pokemon.id) ?? false

  const handleToggle = () => {
    optimisticUpdate.mutate({
      pokemon,
      action: isFavorite ? 'remove' : 'add'
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={optimisticUpdate.isPending}
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  )
}
```

### background sync patterns

sync optimistic updates with server state:

```typescript
// background sync hook
const useBackgroundSync = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const syncInterval = setInterval(
      () => {
        // sync critical data in background
        queryClient.refetchQueries({
          predicate: (query) => {
            const [queryType] = query.queryKey
            return ['user-profile', 'notifications', 'real-time-data'].includes(
              queryType as string,
            )
          },
          type: 'active',
        })
      },
      2 * 60 * 1000,
    ) // every 2 minutes

    return () => clearInterval(syncInterval)
  }, [queryClient])

  // sync on network reconnection
  useEffect(() => {
    const handleOnline = () => {
      queryClient.refetchQueries({ type: 'active' })
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [queryClient])
}
```

## cache persistence

### local storage integration

persistent cache survives browser sessions:

```typescript
// custom persistence configuration
const createPersistentCache = () => {
  const storage = {
    getItem: (key: string) => {
      const item = localStorage.getItem(key)
      if (!item) return null

      try {
        const parsed = JSON.parse(item)
        // check expiration
        if (parsed.expiry && Date.now() > parsed.expiry) {
          localStorage.removeItem(key)
          return null
        }
        return parsed.data
      } catch {
        return null
      }
    },

    setItem: (key: string, value: any) => {
      const item = {
        data: value,
        expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }
      localStorage.setItem(key, JSON.stringify(item))
    },

    removeItem: (key: string) => {
      localStorage.removeItem(key)
    },
  }

  return createSyncStoragePersister({
    storage,
    key: 'pokemon-app-cache',
    throttleTime: 1000,
  })
}

// selective persistence
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'pokemon-cache',
  serialize: (data) => {
    // only persist specific query types
    const filteredData = {
      ...data,
      clientState: {
        ...data.clientState,
        queries: data.clientState.queries.filter((query: any) => {
          const [queryType] = query.queryKey
          return ['pokemon-species', 'countries', 'user-preferences'].includes(
            queryType,
          )
        }),
      },
    }
    return JSON.stringify(filteredData)
  },
})
```

### cache versioning

cache busting for application updates:

```typescript
// version-aware cache configuration
const CACHE_VERSION = process.env.REACT_APP_VERSION || '1.0.0'

const createVersionedCache = () => {
  // clear cache on version change
  const storedVersion = localStorage.getItem('app-version')
  if (storedVersion !== CACHE_VERSION) {
    localStorage.clear()
    localStorage.setItem('app-version', CACHE_VERSION)
  }

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        meta: {
          version: CACHE_VERSION,
        },
      },
    },
  })
}

// migration support
const migrateCache = (oldVersion: string, newVersion: string) => {
  const migrations = {
    '1.0.0->2.0.0': () => {
      // rename query keys
      const cache = queryClient.getQueryCache()
      cache.getAll().forEach((query) => {
        if (query.queryKey[0] === 'old-pokemon-species') {
          const newKey = ['pokemon-species', ...query.queryKey.slice(1)]
          queryClient.setQueryData(newKey, query.state.data)
          queryClient.removeQueries({ queryKey: query.queryKey })
        }
      })
    },
  }

  const migrationKey = `${oldVersion}->${newVersion}`
  const migration = migrations[migrationKey]
  if (migration) migration()
}
```

## performance optimization

### cache size management

monitor and control cache memory usage:

```typescript
// cache size monitoring
const useCacheMonitoring = () => {
  const queryClient = useQueryClient()

  const getCacheStats = () => {
    const cache = queryClient.getQueryCache()
    const queries = cache.getAll()

    return {
      totalQueries: queries.length,
      activeQueries: queries.filter((q) => q.getObserversCount() > 0).length,
      staleQueries: queries.filter((q) => q.isStale()).length,
      errorQueries: queries.filter((q) => q.state.error).length,
      memoryUsage: queries.reduce((size, query) => {
        return size + JSON.stringify(query.state.data || '').length
      }, 0),
    }
  }

  // periodic cache cleanup
  useEffect(() => {
    const cleanup = setInterval(() => {
      const stats = getCacheStats()

      // if memory usage is high, garbage collect aggressively
      if (stats.memoryUsage > 10 * 1024 * 1024) {
        // 10MB
        queryClient.getQueryCache().clear()
      }

      // remove error queries older than 5 minutes
      queryClient.removeQueries({
        predicate: (query) => {
          return (
            query.state.error &&
            Date.now() - query.state.errorUpdateCount > 5 * 60 * 1000
          )
        },
      })
    }, 60 * 1000) // every minute

    return () => clearInterval(cleanup)
  }, [queryClient])

  return { getCacheStats }
}

// cache size limits
const configureCacheLimits = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 10 * 60 * 1000, // 10 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error('query error:', error, query.queryKey)
      },
      onSuccess: (data, query) => {
        // limit individual query cache size
        if (JSON.stringify(data).length > 1024 * 1024) {
          // 1MB
          console.warn('large query data detected:', query.queryKey)
        }
      },
    }),
  })
}
```

### prefetching strategies

proactive loading for better user experience:

```typescript
// prefetch on route change
const usePrefetchOnNavigation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const prefetchRoute = (path: string) => {
    // prefetch data based on route
    switch (path) {
      case '/pokemon':
        queryClient.prefetchQuery({
          queryKey: [POKEMON_LIST_QUERY_KEY],
          queryFn: fetchPokemonList,
        })
        break

      case '/favorites':
        queryClient.prefetchQuery({
          queryKey: ['pokemon-favorites'],
          queryFn: fetchFavorites,
        })
        break

      default:
        break
    }
  }

  const navigateWithPrefetch = (path: string) => {
    prefetchRoute(path)
    navigate(path)
  }

  return { navigateWithPrefetch, prefetchRoute }
}

// intersection observer prefetching
const usePrefetchOnView = () => {
  const queryClient = useQueryClient()

  const prefetchPokemon = useCallback(
    (pokemonId: number) => {
      queryClient.prefetchQuery({
        queryKey: [POKEMON_SPECIES_QUERY_KEY, pokemonId],
        queryFn: () => fetchPokemonSpecies(pokemonId),
        staleTime: 10 * 60 * 1000, // 10 minutes
      })
    },
    [queryClient],
  )

  const observePokemonCard = useCallback(
    (element: Element, pokemonId: number) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              prefetchPokemon(pokemonId)
              observer.unobserve(element)
            }
          })
        },
        { rootMargin: '100px' },
      )

      observer.observe(element)
      return () => observer.disconnect()
    },
    [prefetchPokemon],
  )

  return { observePokemonCard }
}
```

## next.js caching

### server-side caching configuration

next.js fetch api with cache configuration:

```typescript
// next.js fetch with cache tags
const fetchPokemonWithCache = async (id: number): Promise<IPokemonSpecies> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    {
      next: {
        revalidate: 30 * 60, // 30 minutes
        tags: [`pokemon-species-${id}`, 'pokemon-data'],
      },
    },
  )

  if (!response.ok) {
    throw new Error('failed to fetch pokemon species')
  }

  return response.json()
}

// revalidate cache programmatically
import { revalidateTag, revalidatePath } from 'next/cache'

const updatePokemonSpecies = async (
  id: number,
  data: Partial<IPokemonSpecies>,
) => {
  // update data
  await updatePokemonSpeciesInDatabase(id, data)

  // revalidate specific cached data
  revalidateTag(`pokemon-species-${id}`)

  // revalidate entire pokemon data category
  revalidateTag('pokemon-data')

  // revalidate specific paths
  revalidatePath(`/pokemon/${id}`)
  revalidatePath('/pokemon')
}
```

### static generation caching

incremental static regeneration (isr) configuration:

```typescript
// page with isr
export async function generateStaticParams() {
  // generate static params for popular pokemon
  const popularPokemon = await fetchPopularPokemon()

  return popularPokemon.map(pokemon => ({
    id: pokemon.id.toString()
  }))
}

export default async function PokemonPage({ params }: { params: { id: string } }) {
  const pokemon = await fetchPokemonWithCache(parseInt(params.id))

  return <PokemonDetail pokemon={pokemon} />
}

// next.js config for caching
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // 30 seconds
      static: 180 // 3 minutes
    }
  }
}
```

## cache testing

### cache behavior testing

test cache functionality and invalidation:

```typescript
describe('Pokemon Species Cache', () => {
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

  it('should cache pokemon species data', async () => {
    const mockData = createMockPokemonSpecies()
    mockRestGet.mockResolvedValue(mockData)

    const { result } = renderHook(() => usePokemonSpecies(25), {
      wrapper: createQueryWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData)
    })

    // verify data is cached
    const cachedData = queryClient.getQueryData([POKEMON_SPECIES_QUERY_KEY, 25])
    expect(cachedData).toEqual(mockData)
  })

  it('should invalidate cache on mutation', async () => {
    // setup initial cache
    queryClient.setQueryData(
      [POKEMON_SPECIES_QUERY_KEY, 25],
      createMockPokemonSpecies(),
    )

    const { result } = renderHook(() => useUpdatePokemonSpecies(), {
      wrapper: createQueryWrapper(queryClient),
    })

    await act(async () => {
      result.current.mutate({ id: 25, name: 'updated-pikachu' })
    })

    // verify cache was invalidated
    const cachedData = queryClient.getQueryState([
      POKEMON_SPECIES_QUERY_KEY,
      25,
    ])
    expect(cachedData?.isInvalidated).toBe(true)
  })

  it('should handle optimistic updates correctly', async () => {
    const initialFavorites = [createMockPokemon({ id: 1 })]
    queryClient.setQueryData(['pokemon-favorites'], initialFavorites)

    const { result } = renderHook(() => useOptimisticUpdate(), {
      wrapper: createQueryWrapper(queryClient),
    })

    const newPokemon = createMockPokemon({ id: 2 })

    act(() => {
      result.current.mutate({ pokemon: newPokemon, action: 'add' })
    })

    // verify optimistic update
    const optimisticData = queryClient.getQueryData(['pokemon-favorites'])
    expect(optimisticData).toHaveLength(2)
    expect(optimisticData).toContain(newPokemon)
  })
})
```
