import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { IPokemonsResponse } from '@/app/(routes)/(public)/(examples)/pokemons/queries/get-pokemons.type'

import { POKEMONS_PER_PAGE, POKEMONS_QUERY_CONFIG } from './pokemons.const'
import { useMorePokemons } from './pokemons.hook'

vi.mock('@/app/services/http/graphql', () => {
  return {
    graphqlClient: {
      query: vi.fn(),
    },
  }
})

import { graphqlClient } from '@/app/services/http/graphql'

vi.mock(
  '@/app/(routes)/(public)/(examples)/pokemons/queries/get-pokemons.const',
  () => {
    return {
      GET_POKEMONS: 'mocked-query',
    }
  },
)

describe('useMorePokemons Hook', () => {
  let queryClient: QueryClient
  const mockGraphqlQuery = vi.mocked(graphqlClient.query)

  const mockPokemonsResponse: IPokemonsResponse = {
    pokemons: {
      count: 100,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=16&limit=8',
      previous: null,
      status: true,
      message: 'Success',
      results: [
        {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
          image: 'https://example.com/pikachu.png',
        },
        {
          name: 'charizard',
          url: 'https://pokeapi.co/api/v2/pokemon/6/',
          image: 'https://example.com/charizard.png',
        },
      ],
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    )
  }

  describe('Hook Initialization', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.isError).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.hasNextPage).toBe(false)
      expect(result.current.isFetchingNextPage).toBe(false)
    })

    it('should initialize with custom initial offset', () => {
      const customOffset = 16
      const { result } = renderHook(
        () => {
          return useMorePokemons({ initialOffset: customOffset })
        },
        { wrapper },
      )

      expect(result.current.isLoading).toBe(false)
    })

    it('should be disabled by default', () => {
      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      expect(result.current.isLoading).toBe(false)
      expect(result.current.isFetching).toBe(false)
    })
  })

  describe('Query Configuration', () => {
    it('should use correct query key', () => {
      renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      const queries = queryClient.getQueryCache().getAll()
      const pokemonQuery = queries.find((q) => {
        return (
          JSON.stringify(q.queryKey) ===
          JSON.stringify(POKEMONS_QUERY_CONFIG.QUERY_KEY)
        )
      })

      expect(pokemonQuery).toBeDefined()
    })
  })

  describe('Query Function', () => {
    it('should call graphql client with correct parameters', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonsResponse })

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-query',
          {
            limit: POKEMONS_PER_PAGE,
            offset: 8,
          },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })

    it('should call graphql client with custom offset', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonsResponse })

      const customOffset = 16
      const { result } = renderHook(
        () => {
          return useMorePokemons({ initialOffset: customOffset })
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-query',
          {
            limit: POKEMONS_PER_PAGE,
            offset: customOffset,
          },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })

    it('should transform response data correctly', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonsResponse })

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.data).toBeDefined()
      })

      const firstPage = result.current.data?.pages[0]
      expect(firstPage).toEqual({
        data: mockPokemonsResponse.pokemons.results,
        count: mockPokemonsResponse.pokemons.count,
        next: mockPokemonsResponse.pokemons.next,
        previous: mockPokemonsResponse.pokemons.previous,
        nextOffset: 8 + POKEMONS_PER_PAGE,
      })
    })
  })

  describe('Pagination Logic', () => {
    it('should calculate next page param correctly', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonsResponse })

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.hasNextPage).toBe(true)
      })

      const firstPage = result.current.data?.pages[0]
      expect(firstPage?.nextOffset).toBe(16)
    })

    it('should return undefined for next page when all data is loaded', async () => {
      const mockResponseWithNoMore: IPokemonsResponse = {
        pokemons: {
          count: 10,
          next: null,
          previous: null,
          status: true,
          message: 'Success',
          results: mockPokemonsResponse.pokemons.results,
        },
      }

      mockGraphqlQuery.mockResolvedValue({
        data: mockResponseWithNoMore,
      })

      const { result } = renderHook(
        () => {
          return useMorePokemons({ initialOffset: 8 })
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.hasNextPage).toBe(false)
      })
    })

    it('should handle pagination when total count is reached', async () => {
      const mockResponseAtEnd: IPokemonsResponse = {
        pokemons: {
          count: 16,
          next: null,
          previous: 'https://pokeapi.co/api/v2/pokemon/?offset=8&limit=8',
          status: true,
          message: 'Success',
          results: mockPokemonsResponse.pokemons.results,
        },
      }

      mockGraphqlQuery.mockResolvedValue({ data: mockResponseAtEnd })

      const { result } = renderHook(
        () => {
          return useMorePokemons({ initialOffset: 8 })
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.data).toBeDefined()
      })

      const firstPage = result.current.data?.pages[0]
      expect(firstPage?.nextOffset).toBe(16)

      expect(result.current.hasNextPage).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should handle graphql client errors', async () => {
      const mockError = new Error('GraphQL Error')
      mockGraphqlQuery.mockRejectedValue(mockError)

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
        expect(result.current.error).toBe(mockError)
      })
    })

    it('should handle empty response data', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: null })

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.data).toBeDefined()
      })

      const firstPage = result.current.data?.pages[0]
      expect(firstPage).toEqual({
        data: [],
        count: 0,
        next: null,
        previous: null,
        nextOffset: 16,
      })
    })
  })

  describe('Fetch Next Page', () => {
    it('should fetch next page with correct offset', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonsResponse })

      const { result } = renderHook(
        () => {
          return useMorePokemons()
        },
        { wrapper },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.hasNextPage).toBe(true)
      })

      const mockSecondPageResponse: IPokemonsResponse = {
        pokemons: {
          count: 100,
          next: 'https://pokeapi.co/api/v2/pokemon/?offset=24&limit=8',
          previous: 'https://pokeapi.co/api/v2/pokemon/?offset=8&limit=8',
          status: true,
          message: 'Success',
          results: [
            {
              name: 'blastoise',
              url: 'https://pokeapi.co/api/v2/pokemon/9/',
              image: 'https://example.com/blastoise.png',
            },
          ],
        },
      }

      mockGraphqlQuery.mockResolvedValue({
        data: mockSecondPageResponse,
      })

      result.current.fetchNextPage()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-query',
          {
            limit: POKEMONS_PER_PAGE,
            offset: 16,
          },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })
  })

  describe('Configuration Values', () => {
    it('should use correct pokemons per page value', () => {
      expect(POKEMONS_PER_PAGE).toBe(8)
    })

    it('should use correct stale time', () => {
      expect(POKEMONS_QUERY_CONFIG.STALE_TIME).toBe(5 * 60 * 1000)
    })

    it('should use correct query key', () => {
      expect(POKEMONS_QUERY_CONFIG.QUERY_KEY).toEqual(['pokemons', 'infinite'])
    })
  })
})
