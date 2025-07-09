import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { restClient } from '@/app/services/http'

import {
  POKEMON_SPECIES_CONFIG,
  POKEMON_SPECIES_QUERY_KEY,
} from './pokemon-species.const'
import usePokemonSpecies from './pokemon-species-info.hook'
import type { IPokemonSpecies } from './pokemon-species-info.type'

vi.mock('@/app/services/http', () => {
  return {
    restClient: {
      get: vi.fn(),
    },
  }
})

describe('Pokemon Species Hook', () => {
  let queryClient: QueryClient
  const mockRestGet = vi.mocked(restClient.get)

  const mockPokemonSpecies: IPokemonSpecies = {
    id: 25,
    name: 'pikachu',
    base_happiness: 50,
    capture_rate: 190,
    color: { name: 'yellow', url: 'https://example.com/yellow' },
    evolution_chain: { url: 'https://example.com/evolution' },
    flavor_text_entries: [
      {
        flavor_text: 'A cute electric mouse Pokemon',
        language: { name: 'en', url: 'https://example.com/en' },
        version: { name: 'red', url: 'https://example.com/red' },
      },
    ],
    form_descriptions: [],
    forms_switchable: false,
    gender_rate: 4,
    generation: {
      name: 'generation-i',
      url: 'https://example.com/generation-i',
    },
    growth_rate: {
      name: 'medium-fast',
      url: 'https://example.com/medium-fast',
    },
    habitat: { name: 'forest', url: 'https://example.com/forest' },
    has_gender_differences: false,
    hatch_counter: 10,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    order: 35,
    pal_park_encounters: [],
    pokedex_numbers: [],
    shape: { name: 'quadruped', url: 'https://example.com/quadruped' },
    varieties: [],
    genera: [],
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

  describe('usePokemonSpecies Hook', () => {
    describe('Hook Initialization', () => {
      it('should initialize with correct default values when disabled', () => {
        const { result } = renderHook(
          () => {
            return usePokemonSpecies(undefined)
          },
          {
            wrapper,
          },
        )

        expect(result.current.species).toBeUndefined()
        expect(result.current.isLoading).toBe(false)
        expect(result.current.isError).toBe(false)
        expect(result.current.error).toBeNull()
        expect(result.current.isFetching).toBe(false)
        expect(typeof result.current.refetch).toBe('function')
      })

      it('should be disabled when pokemonId is undefined', () => {
        const { result } = renderHook(
          () => {
            return usePokemonSpecies(undefined)
          },
          {
            wrapper,
          },
        )

        expect(result.current.isLoading).toBe(false)
        expect(result.current.isFetching).toBe(false)
      })

      it('should be disabled when enabled option is false', () => {
        const { result } = renderHook(
          () => {
            return usePokemonSpecies(25, { enabled: false })
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
            return usePokemonSpecies(25)
          },
          { wrapper },
        )

        const queries = queryClient.getQueryCache().getAll()
        const speciesQuery = queries.find((q) => {
          return (
            JSON.stringify(q.queryKey) ===
            JSON.stringify([POKEMON_SPECIES_QUERY_KEY, 25])
          )
        })

        expect(speciesQuery).toBeDefined()
      })

      it('should have correct stale time configuration', () => {
        const expectedStaleTime =
          1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_CACHE_MINUTES

        expect(expectedStaleTime).toBe(30 * 60 * 1000)
      })

      it('should have correct gc time configuration', () => {
        const expectedGcTime =
          1000 * 60 * POKEMON_SPECIES_CONFIG.SPECIES_GC_MINUTES

        expect(expectedGcTime).toBe(60 * 60 * 1000)
      })

      it('should have correct retry configuration', () => {
        expect(POKEMON_SPECIES_CONFIG.RETRY_COUNT).toBe(2)
      })
    })

    describe('Query Function', () => {
      it('should call rest client with correct parameters', async () => {
        mockRestGet.mockResolvedValue(mockPokemonSpecies)

        const { result } = renderHook(
          () => {
            return usePokemonSpecies(25)
          },
          { wrapper },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(mockRestGet).toHaveBeenCalledWith('/pokemon-species/25', {
            baseUrl: 'https://pokeapi.co/api/v2',
          })
        })
      })

      it('should transform response data correctly', async () => {
        mockRestGet.mockResolvedValue(mockPokemonSpecies)

        const { result } = renderHook(
          () => {
            return usePokemonSpecies(25)
          },
          { wrapper },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(result.current.species).toEqual(mockPokemonSpecies)
        })
      })
    })

    describe('Options Handling', () => {
      it('should respect enabled option', async () => {
        mockRestGet.mockResolvedValue(mockPokemonSpecies)

        const { result } = renderHook(
          () => {
            return usePokemonSpecies(25, { enabled: false })
          },
          { wrapper },
        )

        expect(result.current.isLoading).toBe(false)
        expect(result.current.isFetching).toBe(false)
        expect(mockRestGet).not.toHaveBeenCalled()
      })

      it('should enable query when both pokemonId and enabled are truthy', async () => {
        mockRestGet.mockResolvedValue(mockPokemonSpecies)

        const { result } = renderHook(
          () => {
            return usePokemonSpecies(25, { enabled: true })
          },
          { wrapper },
        )

        result.current.refetch()

        await waitFor(() => {
          expect(mockRestGet).toHaveBeenCalled()
        })
      })
    })
  })

  describe('Configuration Values', () => {
    it('should have correct species cache minutes', () => {
      expect(POKEMON_SPECIES_CONFIG.SPECIES_CACHE_MINUTES).toBe(30)
    })

    it('should have correct species gc minutes', () => {
      expect(POKEMON_SPECIES_CONFIG.SPECIES_GC_MINUTES).toBe(60)
    })

    it('should have correct retry count', () => {
      expect(POKEMON_SPECIES_CONFIG.RETRY_COUNT).toBe(2)
    })

    it('should have correct query key', () => {
      expect(POKEMON_SPECIES_QUERY_KEY).toBe('pokemon-species')
    })
  })
})
