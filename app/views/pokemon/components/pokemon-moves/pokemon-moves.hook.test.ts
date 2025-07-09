import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { graphqlClient } from '@/app/services/http'

import {
  POKEMON_MOVES_GRAPHQL_CONFIG,
  POKEMON_MOVES_GRAPHQL_QUERY_KEY,
} from './pokemon-moves.const'
import usePokemonMovesGraphQL from './pokemon-moves.hook'
import type { IGraphQLPokemonMovesResponse } from './pokemon-moves.type'

vi.mock('@/app/services/http', () => {
  return {
    graphqlClient: {
      query: vi.fn(),
    },
  }
})

describe('Pokemon Moves GraphQL Hook', () => {
  let queryClient: QueryClient
  const mockGraphqlQuery = vi.mocked(graphqlClient.query)

  const mockPokemonMovesResponse: IGraphQLPokemonMovesResponse = {
    pokemon: {
      id: 25,
      name: 'pikachu',
      moves: [
        {
          move: {
            name: 'thunderbolt',
            url: 'https://example.com/thunderbolt',
          },
        },
        {
          move: {
            name: 'quick-attack',
            url: 'https://example.com/quick-attack',
          },
        },
      ],
      message: 'Success',
      status: true,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0,
          gcTime: 0,
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

  describe('usePokemonMovesGraphQL Hook', () => {
    describe('Hook Initialization', () => {
      it('should initialize with correct default values when disabled', () => {
        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu', { enabled: false })
          },
          { wrapper },
        )

        expect(result.current.pokemonMoves).toBeUndefined()
        expect(result.current.isLoading).toBe(false)
        expect(result.current.isError).toBe(false)
        expect(result.current.error).toBeNull()
        expect(result.current.isFetching).toBe(false)
        expect(typeof result.current.refetch).toBe('function')
      })

      it('should be disabled when enabled option is false', () => {
        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu', { enabled: false })
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
            return usePokemonMovesGraphQL('pikachu')
          },
          { wrapper },
        )

        const queries = queryClient.getQueryCache().getAll()
        const movesQuery = queries.find((q) => {
          return (
            JSON.stringify(q.queryKey) ===
            JSON.stringify([POKEMON_MOVES_GRAPHQL_QUERY_KEY, 'pikachu'])
          )
        })

        expect(movesQuery).toBeDefined()
      })

      it('should have correct stale time configuration', () => {
        const expectedStaleTime =
          POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_CACHE_MINUTES *
          60 *
          1000

        expect(expectedStaleTime).toBe(15 * 60 * 1000)
      })

      it('should have correct gc time configuration', () => {
        const expectedGcTime =
          POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_GC_MINUTES *
          60 *
          1000

        expect(expectedGcTime).toBe(30 * 60 * 1000)
      })
    })

    describe('Query Function', () => {
      it('should call graphql client with correct parameters', async () => {
        mockGraphqlQuery.mockResolvedValue({ data: mockPokemonMovesResponse })

        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu')
          },
          {
            wrapper,
          },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(mockGraphqlQuery).toHaveBeenCalledWith(
            expect.stringContaining('GetPokemonMoves'),
            { name: 'pikachu' },
            {
              baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
            },
          )
        })
      })

      it('should transform response data correctly', async () => {
        mockGraphqlQuery.mockResolvedValue({ data: mockPokemonMovesResponse })

        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu')
          },
          {
            wrapper,
          },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(result.current.pokemonMoves).toEqual(
            mockPokemonMovesResponse.pokemon,
          )
        })
      })
    })

    describe('Error Handling', () => {
      it('should handle invalid response data', async () => {
        mockGraphqlQuery.mockResolvedValue({ data: null })

        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu', { enabled: true })
          },
          {
            wrapper,
          },
        )

        await waitFor(
          () => {
            expect(result.current.pokemonMoves).toBeUndefined()
          },
          { timeout: 3000 },
        )
      })
    })

    describe('Options Handling', () => {
      it('should respect enabled option', async () => {
        mockGraphqlQuery.mockResolvedValue({ data: mockPokemonMovesResponse })

        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu', { enabled: false })
          },
          { wrapper },
        )

        expect(result.current.isLoading).toBe(false)
        expect(result.current.isFetching).toBe(false)
        expect(mockGraphqlQuery).not.toHaveBeenCalled()
      })

      it('should enable query when enabled option is true', async () => {
        mockGraphqlQuery.mockResolvedValue({ data: mockPokemonMovesResponse })

        const { result } = renderHook(
          () => {
            return usePokemonMovesGraphQL('pikachu', { enabled: true })
          },
          { wrapper },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(mockGraphqlQuery).toHaveBeenCalled()
        })
      })
    })
  })

  describe('Configuration Values', () => {
    it('should have correct pokemon moves graphql cache minutes', () => {
      expect(
        POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_CACHE_MINUTES,
      ).toBe(15)
    })

    it('should have correct pokemon moves graphql gc minutes', () => {
      expect(
        POKEMON_MOVES_GRAPHQL_CONFIG.POKEMON_MOVES_GRAPHQL_GC_MINUTES,
      ).toBe(30)
    })

    it('should have correct retry count', () => {
      expect(POKEMON_MOVES_GRAPHQL_CONFIG.RETRY_COUNT).toBe(2)
    })

    it('should have correct query key', () => {
      expect(POKEMON_MOVES_GRAPHQL_QUERY_KEY).toBe('pokemon-moves-graphql')
    })
  })
})
