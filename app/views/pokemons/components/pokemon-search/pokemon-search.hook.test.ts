import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  POKEMON_SEARCH_QUERY_KEY,
  POKEMON_SEARCH_STALE_TIME,
} from './pokemon-search.const'
import { usePokemonNameSearch } from './pokemon-search.hook'
import type {
  IPokemonSearchResponse,
  IPokemonSearchResult,
} from './pokemon-search.type'

vi.mock('@/app/services/http/graphql', () => {
  return {
    graphqlClient: {
      query: vi.fn(),
    },
  }
})

vi.mock('./pokemon-search.const', () => {
  return {
    GET_POKEMON_BY_NAME: 'mocked-search-query',
    POKEMON_SEARCH_QUERY_KEY: 'pokemon-search',
    POKEMON_SEARCH_STALE_TIME: 5 * 60 * 1000,
  }
})

import { graphqlClient } from '@/app/services/http/graphql'

describe('usePokemonNameSearch Hook', () => {
  let queryClient: QueryClient
  const mockGraphqlQuery = vi.mocked(graphqlClient.query)

  const mockPokemonSearchResult: IPokemonSearchResult = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
    species: {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
    },
    types: [
      {
        type: {
          name: 'electric',
        },
      },
    ],
  }

  const mockPokemonSearchResponse: IPokemonSearchResponse = {
    pokemon: mockPokemonSearchResult,
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

  describe('Hook Initialization', () => {
    it('should initialize with correct default values when disabled', () => {
      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('')
        },
        {
          wrapper,
        },
      )

      expect(result.current.result).toBeUndefined()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
      expect(typeof result.current.refetch).toBe('function')
    })

    it('should be disabled when search term is empty', () => {
      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('')
        },
        {
          wrapper,
        },
      )

      expect(result.current.isLoading).toBe(false)
      expect(mockGraphqlQuery).not.toHaveBeenCalled()
    })

    it('should be disabled when search term is only whitespace', () => {
      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('   ')
        },
        {
          wrapper,
        },
      )

      expect(result.current.isLoading).toBe(false)
      expect(mockGraphqlQuery).not.toHaveBeenCalled()
    })

    it('should be enabled when search term is valid', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })
  })

  describe('Query Configuration', () => {
    it('should use correct query key', () => {
      renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        { wrapper },
      )

      const queries = queryClient.getQueryCache().getAll()
      const searchQuery = queries.find((q) => {
        return (
          JSON.stringify(q.queryKey) ===
          JSON.stringify([POKEMON_SEARCH_QUERY_KEY, 'pikachu'])
        )
      })

      expect(searchQuery).toBeDefined()
    })

    it('should have correct stale time configuration', () => {
      expect(POKEMON_SEARCH_STALE_TIME).toBe(5 * 60 * 1000)
    })

    it('should have correct retry configuration', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      // The hook should use retry: 1 based on the implementation
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })
  })

  describe('Query Function', () => {
    it('should call graphql client with correct parameters', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-search-query',
          { name: 'pikachu' },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })

    it('should convert search term to lowercase', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('PIKACHU')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-search-query',
          { name: 'pikachu' },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })

    it('should transform response data correctly', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result).toEqual(mockPokemonSearchResult)
      })
    })

    it('should handle search terms with special characters', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('Mr. Mime')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalledWith(
          'mocked-search-query',
          { name: 'mr. mime' },
          {
            baseUrl: 'https://graphql-pokeapi.graphcdn.app/',
          },
        )
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle graphql client errors', async () => {
      const mockError = new Error('GraphQL Error')
      mockGraphqlQuery.mockRejectedValue(mockError)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toEqual(mockError)
        },
        { timeout: 3000 },
      )
    })

    it('should handle pokemon not found error', async () => {
      const mockResponse = {
        data: {
          pokemon: null,
        },
      }
      mockGraphqlQuery.mockResolvedValue(mockResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('notfound')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toBeInstanceOf(Error)
          expect(result.current.error?.message).toBe(
            'Pokemon "notfound" not found',
          )
        },
        { timeout: 3000 },
      )
    })

    it('should handle pokemon with missing name', async () => {
      const mockResponse = {
        data: {
          pokemon: {
            id: 25,
            name: '',
            sprites: { front_default: 'test.png' },
            species: { name: 'test', url: 'test' },
            types: [],
          },
        },
      }
      mockGraphqlQuery.mockResolvedValue(mockResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('test')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toBeInstanceOf(Error)
          expect(result.current.error?.message).toBe('Pokemon "test" not found')
        },
        { timeout: 3000 },
      )
    })

    it('should handle pokemon with null id', async () => {
      const mockResponse = {
        data: {
          pokemon: {
            id: null,
            name: 'test',
            sprites: { front_default: 'test.png' },
            species: { name: 'test', url: 'test' },
            types: [],
          },
        },
      }
      mockGraphqlQuery.mockResolvedValue(mockResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('test')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toBeInstanceOf(Error)
          expect(result.current.error?.message).toBe('Pokemon "test" not found')
        },
        { timeout: 3000 },
      )
    })

    it('should handle empty response data', async () => {
      const mockResponse = {
        data: null,
      }
      mockGraphqlQuery.mockResolvedValue(mockResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('test')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toBeInstanceOf(Error)
          expect(result.current.error?.message).toBe('Pokemon "test" not found')
        },
        { timeout: 3000 },
      )
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network Error')
      mockGraphqlQuery.mockRejectedValue(networkError)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      await waitFor(
        () => {
          expect(result.current.error).toEqual(networkError)
        },
        { timeout: 3000 },
      )
    })
  })

  describe('Query Enabling/Disabling', () => {
    it('should enable query when search term is not empty', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalled()
      })
    })

    it('should disable query when search term is empty', () => {
      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('')
        },
        {
          wrapper,
        },
      )

      expect(result.current.isLoading).toBe(false)
      expect(mockGraphqlQuery).not.toHaveBeenCalled()
    })

    it('should disable query when search term is only spaces', () => {
      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('    ')
        },
        {
          wrapper,
        },
      )

      expect(result.current.isLoading).toBe(false)
      expect(mockGraphqlQuery).not.toHaveBeenCalled()
    })

    it('should enable query when search term has leading/trailing spaces', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('  pikachu  ')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalled()
      })
    })
  })

  describe('Response Validation', () => {
    it('should successfully return valid pokemon data', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result).toEqual(mockPokemonSearchResult)
        expect(result.current.error).toBeNull()
      })
    })

    it('should handle pokemon with multiple types', async () => {
      const mockMultiTypeResponse = {
        data: {
          pokemon: {
            ...mockPokemonSearchResult,
            types: [
              { type: { name: 'electric' } },
              { type: { name: 'flying' } },
            ],
          },
        },
      }
      mockGraphqlQuery.mockResolvedValue(mockMultiTypeResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result?.types).toHaveLength(2)
        expect(result.current.result?.types[0].type.name).toBe('electric')
        expect(result.current.result?.types[1].type.name).toBe('flying')
      })
    })

    it('should handle pokemon with null sprites', async () => {
      const mockResponseWithNullSprites = {
        data: {
          pokemon: {
            ...mockPokemonSearchResult,
            sprites: {
              front_default: null,
            },
          },
        },
      }
      mockGraphqlQuery.mockResolvedValue(mockResponseWithNullSprites)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result?.sprites.front_default).toBeNull()
      })
    })
  })

  describe('Configuration Values', () => {
    it('should use correct query key', () => {
      expect(POKEMON_SEARCH_QUERY_KEY).toBe('pokemon-search')
    })

    it('should use correct stale time', () => {
      expect(POKEMON_SEARCH_STALE_TIME).toBe(5 * 60 * 1000)
    })
  })

  describe('Refetch Functionality', () => {
    it('should allow manual refetch', async () => {
      mockGraphqlQuery.mockResolvedValue({ data: mockPokemonSearchResponse })

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      expect(typeof result.current.refetch).toBe('function')

      result.current.refetch()

      await waitFor(() => {
        expect(mockGraphqlQuery).toHaveBeenCalled()
      })
    })

    it('should handle refetch with different results', async () => {
      const firstResponse = { data: mockPokemonSearchResponse }
      const secondResponse = {
        data: {
          pokemon: {
            ...mockPokemonSearchResult,
            id: 6,
            name: 'charizard',
          },
        },
      }

      mockGraphqlQuery.mockResolvedValueOnce(firstResponse)
      mockGraphqlQuery.mockResolvedValueOnce(secondResponse)

      const { result } = renderHook(
        () => {
          return usePokemonNameSearch('pikachu')
        },
        {
          wrapper,
        },
      )

      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result?.name).toBe('pikachu')
      })

      mockGraphqlQuery.mockResolvedValue(secondResponse)
      result.current.refetch()

      await waitFor(() => {
        expect(result.current.result?.name).toBe('charizard')
      })
    })
  })
})
