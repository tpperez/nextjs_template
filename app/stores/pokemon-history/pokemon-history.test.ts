import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { IPokemon } from '@/app/(routes)/(public)/(examples)/pokemons/query'

import { usePokemonHistoryStore } from './pokemon-history'
import { POKEMON_HISTORY_CONFIG } from './pokemon-history.const'

vi.mock('zustand/middleware', () => {
  return {
    persist: vi.fn((fn) => {
      return fn
    }),
  }
})

describe('usePokemonHistoryStore', () => {
  const mockPokemon1: IPokemon = {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon/25/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  }

  const mockPokemon2: IPokemon = {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon/6/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
  }

  const mockPokemon3: IPokemon = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  }

  beforeEach(() => {
    const { result } = renderHook(() => {
      return usePokemonHistoryStore()
    })
    act(() => {
      result.current.clearHistory()
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with empty history', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      expect(result.current.history).toEqual([])
      expect(result.current.history).toHaveLength(0)
    })

    it('should provide addToHistory function', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      expect(typeof result.current.addToHistory).toBe('function')
    })

    it('should provide clearHistory function', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      expect(typeof result.current.clearHistory).toBe('function')
    })
  })

  describe('Adding Pokemon to History', () => {
    it('should add a new Pokemon to history', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
      })

      expect(result.current.history).toHaveLength(1)
      expect(result.current.history[0]).toEqual(mockPokemon1)
    })

    it('should add multiple Pokemon to history in correct order', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
      })

      expect(result.current.history).toHaveLength(3)
      expect(result.current.history[0]).toEqual(mockPokemon3)
      expect(result.current.history[1]).toEqual(mockPokemon2)
      expect(result.current.history[2]).toEqual(mockPokemon1)
    })

    it('should add new Pokemon to the beginning of history', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
      })

      expect(result.current.history[0]).toEqual(mockPokemon2)
      expect(result.current.history[1]).toEqual(mockPokemon1)
    })
  })

  describe('Duplicate Pokemon Handling', () => {
    it('should move existing Pokemon to the front when added again', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
        result.current.addToHistory(mockPokemon1) // Add duplicate
      })

      expect(result.current.history).toHaveLength(3)
      expect(result.current.history[0]).toEqual(mockPokemon1)
      expect(result.current.history[1]).toEqual(mockPokemon3)
      expect(result.current.history[2]).toEqual(mockPokemon2)
    })

    it('should not increase history length when adding duplicate', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
      })

      expect(result.current.history).toHaveLength(2)

      act(() => {
        result.current.addToHistory(mockPokemon1)
      })

      expect(result.current.history).toHaveLength(2)
    })

    it('should handle duplicate identification correctly by name', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      const duplicatePokemon: IPokemon = {
        name: 'pikachu',
        url: 'different-url',
        image: 'different-image',
      }

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(duplicatePokemon)
      })

      expect(result.current.history).toHaveLength(2)
      expect(result.current.history[0]).toEqual(duplicatePokemon)
      expect(result.current.history[1]).toEqual(mockPokemon2)
    })
  })

  describe('History Size Limiting', () => {
    it('should respect MAX_HISTORY_SIZE limit', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      const extraPokemon: IPokemon[] = [
        { name: 'pokemon4', url: 'url4', image: 'image4' },
        { name: 'pokemon5', url: 'url5', image: 'image5' },
        { name: 'pokemon6', url: 'url6', image: 'image6' },
      ]

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
        extraPokemon.forEach((pokemon) => {
          return result.current.addToHistory(pokemon)
        })
      })

      expect(result.current.history).toHaveLength(
        POKEMON_HISTORY_CONFIG.MAX_HISTORY_SIZE,
      )
      expect(result.current.history).toHaveLength(5)
    })

    it('should remove oldest Pokemon when exceeding limit', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      const extraPokemon: IPokemon = {
        name: 'pokemon6',
        url: 'url6',
        image: 'image6',
      }

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
        result.current.addToHistory({
          name: 'pokemon4',
          url: 'url4',
          image: 'image4',
        })
        result.current.addToHistory({
          name: 'pokemon5',
          url: 'url5',
          image: 'image5',
        })
        result.current.addToHistory(extraPokemon)
      })

      expect(result.current.history).toHaveLength(5)
      expect(result.current.history[0]).toEqual(extraPokemon)
      expect(result.current.history).not.toContain(mockPokemon1)
    })

    it('should maintain size limit when moving duplicate to front', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
        result.current.addToHistory({
          name: 'pokemon4',
          url: 'url4',
          image: 'image4',
        })
        result.current.addToHistory({
          name: 'pokemon5',
          url: 'url5',
          image: 'image5',
        })

        result.current.addToHistory(mockPokemon1)
      })

      expect(result.current.history).toHaveLength(5)
      expect(result.current.history[0]).toEqual(mockPokemon1)
    })
  })

  describe('Clear History', () => {
    it('should clear all Pokemon from history', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
      })

      expect(result.current.history).toHaveLength(3)

      act(() => {
        result.current.clearHistory()
      })

      expect(result.current.history).toEqual([])
      expect(result.current.history).toHaveLength(0)
    })

    it('should handle clearing empty history', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      expect(result.current.history).toHaveLength(0)

      act(() => {
        result.current.clearHistory()
      })

      expect(result.current.history).toEqual([])
      expect(result.current.history).toHaveLength(0)
    })
  })

  describe('Edge Cases and Complex Scenarios', () => {
    it('should handle rapid sequential additions', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon3)
        result.current.addToHistory(mockPokemon2)
      })

      expect(result.current.history).toHaveLength(3)
      expect(result.current.history[0]).toEqual(mockPokemon2)
      expect(result.current.history[1]).toEqual(mockPokemon3)
      expect(result.current.history[2]).toEqual(mockPokemon1)
    })

    it('should handle Pokemon with special characters in names', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      const specialPokemon: IPokemon = {
        name: "farfetch'd",
        url: 'https://pokeapi.co/api/v2/pokemon/83/',
        image: 'image-url',
      }

      act(() => {
        result.current.addToHistory(specialPokemon)
      })

      expect(result.current.history).toHaveLength(1)
      expect(result.current.history[0]).toEqual(specialPokemon)
    })

    it('should handle Pokemon with empty strings safely', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      const emptyPokemon: IPokemon = {
        name: '',
        url: '',
        image: '',
      }

      act(() => {
        result.current.addToHistory(emptyPokemon)
      })

      expect(result.current.history).toHaveLength(1)
      expect(result.current.history[0]).toEqual(emptyPokemon)
    })

    it('should maintain history order after multiple operations', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon3)
      })

      const beforeClear = [...result.current.history]
      expect(beforeClear).toHaveLength(3)

      act(() => {
        result.current.clearHistory()
      })

      expect(result.current.history).toHaveLength(0)

      act(() => {
        result.current.addToHistory(mockPokemon2)
        result.current.addToHistory(mockPokemon1)
      })

      expect(result.current.history).toHaveLength(2)
      expect(result.current.history[0]).toEqual(mockPokemon1)
      expect(result.current.history[1]).toEqual(mockPokemon2)
    })
  })

  describe('Store Integration', () => {
    it('should maintain consistent state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => {
        return usePokemonHistoryStore()
      })
      const { result: result2 } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result1.current.addToHistory(mockPokemon1)
      })

      expect(result2.current.history).toHaveLength(1)
      expect(result2.current.history[0]).toEqual(mockPokemon1)

      act(() => {
        result2.current.addToHistory(mockPokemon2)
      })

      expect(result1.current.history).toHaveLength(2)
      expect(result1.current.history[0]).toEqual(mockPokemon2)
    })

    it('should handle concurrent operations correctly', () => {
      const { result } = renderHook(() => {
        return usePokemonHistoryStore()
      })

      act(() => {
        result.current.addToHistory(mockPokemon1)
        result.current.addToHistory(mockPokemon2)
        result.current.clearHistory()
        result.current.addToHistory(mockPokemon3)
      })

      expect(result.current.history).toHaveLength(1)
      expect(result.current.history[0]).toEqual(mockPokemon3)
    })
  })
})
